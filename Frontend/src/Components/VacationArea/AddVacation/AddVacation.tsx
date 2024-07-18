import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import VacationForm from "../Components/VacationForm/VacationForm";
import { useFormVacation } from "../hooks/useFormVacation";
import "./AddVacation.css";
import useTitle from "../../../Utils/UseTitle";

function AddVacation(): JSX.Element {
  const { register, handleSubmit } = useForm<VacationModel>();
  const navigate = useNavigate();

  useTitle("Add Vacation")

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
    clearEndDate,
    clearStartDate,
  } = useFormVacation();

  async function sendVacation(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      const startOnDate = startDate ? formatDate(startDate) : null;
      const endOnDate = endDate ? formatDate(endDate) : null;
      vacation.startDate = startOnDate;
      vacation.endDate = endOnDate;
      await vacationsService.addVacation(vacation);

      notify.success("Vacation has been added");
      navigate("/home");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
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
      requiredImage
      maxDate={endDate}
      buttonText="Add"
    />
  );
}

export default AddVacation;
