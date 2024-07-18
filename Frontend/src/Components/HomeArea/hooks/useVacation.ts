import { useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { VacationModel } from "../../../Models/VacationModel";
import { notify } from "../../../Utils/Notify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Redux/Store";
import { useNavigate } from "react-router";
import { vacationActionCreators } from "../../../Redux/VacationsSlice";
import { likesService } from "../../../Services/LikeService";

export const useVacation = (vacation: VacationModel) => {
  const [open, setOpen] = useState<boolean>(false);

  const { id, likesCount, isLiked } = vacation;

  const dispatch = useDispatch();

  const userId = useAppSelector((state) => state.user?.userId);
  const adminRole = useAppSelector((state) => state.user?.roleId === 1);
  const userRole = useAppSelector((state) => state.user?.roleId === 2);

  // Define an asynchronous function to handle the confirmation button click event
  async function handleConfirmButton(): Promise<void> {
    setOpen(false);
    try {
      // Attempt to delete the vacation using the vacationsService
      await vacationsService.deleteVacation(id);
      notify.success("Vacation has been deleted");
    } catch (err: any) {
      notify.error(err);
    }
  }

  // Define a function to handle the cancel button click event by closing the modal
  function handleCancelButton(): void {
    setOpen(false);
  }

  // Define a function to handle opening the modal
  function handleModal(): void {
    setOpen(true);
  }

  // Access the navigate function from the router
  const navigate = useNavigate();

  // Define a function to handle adding a like to the vacation
  const addLike = (e: React.MouseEvent<HTMLInputElement>) => {
    // Prevent the default behavior of the click event
    e.preventDefault();

    // Dispatch an action to update the vacation state with the new like information
    dispatch(
      vacationActionCreators.updateOne({
        ...vacation,
        isLiked: 1,
        likesCount: likesCount + 1,
      })
    );

    // Call the likesService to add a like for the vacation
    likesService
      .addLike(userId, id)
      .then()
      .catch((err) => {
        notify.error(err);
        dispatch(
          vacationActionCreators.updateOne({
            ...vacation,
            likesCount,
            isLiked: 0,
          })
        );
      });
  };

  // Define a function to handle removing a like from the vacation
  const removeLike = (e: React.MouseEvent<HTMLInputElement>) => {
    // Prevent the default behavior of the click event
    e.preventDefault();

    // Dispatch an action to update the vacation state with the removed like information
    dispatch(
      vacationActionCreators.updateOne({
        ...vacation,
        isLiked: 0,
        likesCount: likesCount - 1,
      })
    );

    // Call the likesService to remove a like from the vacation
    likesService
      .deleteLike(userId, id)
      .then(() => {})
      .catch((err) => {
        notify.error(err);
        dispatch(
          vacationActionCreators.updateOne({
            ...vacation,
            likesCount,
            isLiked: 1,
          })
        );
      });
  };

  // Define a function to navigate to the edit page of the vacation
  function navigateToEditPage(): void {
    navigate("/layout/vacation/edit/" + vacation?.id);
  }

  return {
    handleConfirmButton,
    handleCancelButton,
    handleModal,
    open,
    removeLike,
    navigateToEditPage,
    addLike,
    isLiked,
    likesCount,
    adminRole,
    userRole,
  };
};
