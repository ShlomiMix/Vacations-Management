import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { VacationModel } from "../../../../Models/VacationModel";
import { useVacation } from "../../hooks/useVacation";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import LikeButton from "../LikeButton/LikeButton";
import Modal from "../Modal/Modal";
import "./VacationCard.css";

interface Props {
  vacation: VacationModel;
}

function formatDate(date: string): string {
  return moment(date).format("DD.MM.YYYY");
}

function VacationCard({ vacation }: Props): JSX.Element {
  const {
    handleCancelButton,
    handleConfirmButton,
    handleModal,
    open,
    addLike,
    isLiked,
    likesCount,
    navigateToEditPage,
    removeLike,
    adminRole,
    userRole,
  } = useVacation(vacation);

  return (
    <div className="VacationCard">
      <div className="header-container">
        <img src={vacation.imageUrl} alt="..." />
      </div>
      <div className="vacation-name-container">
        <span className="vacation-name">{vacation.destination}</span>
      </div>
      <div className="date-wrapper">
        <div className="date-container">
          <CalendarMonthIcon fontSize="small" />
          <span className="date-text">
            {formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}
          </span>
        </div>
      </div>

      <Tooltip
        placement="left-end"
        title={<p className="description-tooltip">{vacation.description}</p>}
      >
        <div className="description-container">
          <p className="description-text">{vacation.description}</p>
        </div>
      </Tooltip>
      <div className="price-container">
        <span className="price">${+vacation.price}</span>
      </div>
      {userRole && (
        <LikeButton
          isLiked={isLiked}
          likesCount={likesCount}
          addLike={addLike}
          removeLike={removeLike}
        />
      )}
      {adminRole && (
        <>
          <EditButton onClick={navigateToEditPage} />
          <DeleteButton onClick={handleModal} />
        </>
      )}
      <Modal
        handleClose={handleModal}
        open={open}
        cancel={handleCancelButton}
        confirm={handleConfirmButton}
      />
    </div>
  );
}

export default VacationCard;
