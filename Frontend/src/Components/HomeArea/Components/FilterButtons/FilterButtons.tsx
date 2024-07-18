import { Button, Checkbox } from "@mui/material";
import { useAppSelector } from "../../../../Redux/Store";
import SliderFilter from "../SliderFilter/SliderFilter";
import "./FilterButtons.css";

interface Props {
  isMyVacation: boolean;
  setIsMyVacation: (isMyVacation: boolean) => void;
  isSoon: boolean;
  setIsSoon: (isSoon: boolean) => void;
  isActive: boolean;
  setIsActive: (isMyVacation: boolean) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  minPrice: number;
  maxPrice: number;
}

function FilterButtons({isMyVacation,setIsMyVacation,isSoon,setIsSoon,isActive,setIsActive,onPriceChange,minPrice,maxPrice,}: Props): JSX.Element {
  const userRole = useAppSelector((state) => state.user?.roleId === 2);

  const handleIsLikedButtonClick = () => {
    setIsMyVacation(!isMyVacation);
  };

  const handleSoonButtonClick = () => {
    setIsSoon(!isSoon);
  };

  const handleActivesButtonClick = () => {
    setIsActive(!isActive);
  };

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    onPriceChange(minPrice, maxPrice);
  };

  return (
    <div className="filter-buttons-container">
      {userRole && (
        <Button onClick={handleIsLikedButtonClick}>
          <Checkbox checked={isMyVacation} /> My Favorites
        </Button>
      )}

      <Button onClick={handleSoonButtonClick}>
        <Checkbox checked={isSoon} /> Soon Vacations
      </Button>

      <Button onClick={handleActivesButtonClick}>
        <Checkbox checked={isActive} /> Active Vacations
      </Button>

      <SliderFilter
        onChange={handlePriceChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}

export default FilterButtons;
