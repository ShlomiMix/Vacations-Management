import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.min.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import VacationForm from "../Components/VacationForm/VacationForm";
import "./EditVacation.css";
import { useFormVacation } from "../hooks/useFormVacation";
import useTitle from "../../../Utils/UseTitle";

function EditVacation(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();

  const params = useParams();

  useTitle("Edit Vacation")

  const {
    formatDate,
    clearDatesAndImage,
    onImageChange,
    isImage,
    image,
    fileRef,
    clearImage,
    startDate,
    endDate,
    handleChangeEndDateValue,
    handleChangeStartDateValue,
    setStartDate,
    setEndDate,
    clearEndDate,
    clearStartDate,
    onImageLoad,
  } = useFormVacation();

  useEffect(() => {
    vacationsService.getOneVacation(+params.id).then((v) => {
      setValue("destination", v?.destination);
      setValue("description", v?.description);
      setStartDate(new Date(v?.startDate));
      setEndDate(new Date(v?.endDate));
      setValue("price", v?.price);
      onImageLoad(v?.imageUrl);
    });
  }, []);

  async function sendVacation(vacation: VacationModel): Promise<void> {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      vacation.id = +params.id;
      const startOnDate = startDate ? formatDate(startDate) : null;
      const endOnDate = endDate ? formatDate(endDate) : null;
      vacation.startDate = startOnDate;
      vacation.endDate = endOnDate;
      await vacationsService.updateVacation(vacation);
      notify.success("Vacation has been updated");
      navigate("/list");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="EditVacation">
      <VacationForm
        submit={handleSubmit(sendVacation)}
        register={register}
        clearStartDate={clearStartDate}
        startDate={startDate}
        handleChangeStartDateValue={handleChangeStartDateValue}
        clearEndDate={clearEndDate}
        endDate={endDate}
        handleChangeEndDateValue={handleChangeEndDateValue}
        clearDatesAndImage={clearDatesAndImage}
        fileRef={fileRef}
        onImageChange={onImageChange}
        isImage={isImage}
        image={image}
        clearImage={clearImage}
        allowPastDates
        buttonText="Save"
      />
    </div>
  );
}

export default EditVacation;
