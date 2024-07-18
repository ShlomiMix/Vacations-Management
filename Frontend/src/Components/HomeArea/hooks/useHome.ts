import { useEffect, useMemo, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { vacationActionCreators } from "../../../Redux/VacationsSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";

const vacationsPerPage = 9;

export const useHome = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMyVacation, setIsMyVacation] = useState<boolean>(false);
  const [isSoon, setIsSoon] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const vacations = useAppSelector((state) => state?.vacations);

  const userId = useAppSelector((state) => state.user?.userId);

  const dispatch = useDispatch();
   
  // Define a memoized variable that filters vacations based on specified criteria
  const filteredVacations = useMemo(() => {
    // Initialize filtered results with all vacations
    let filteredResults = vacations;

    // Filter vacations if isMyVacation is true
    if (isMyVacation) {
      filteredResults = filteredResults.filter((v) => v.isLiked === 1);
    }
    
     // Filter vacations if isSoon is true
    if (isSoon) {
      filteredResults = filteredResults.filter(
        (v) => new Date(v.startDate).getTime() > new Date().getTime()
      );
    }

    // Filter vacations if isActive is true
    if (isActive) {
      filteredResults = filteredResults.filter(
        (v) =>
          new Date(v.startDate).getTime() <= new Date().getTime() &&
          new Date(v.endDate).getTime() >= new Date().getTime()
      );
    }
    
    // Filter vacations by price range if both minPrice and maxPrice are defined
    if (minPrice && maxPrice) {
      filteredResults = filteredResults.filter(
        (v) => v.price >= minPrice && v.price <= maxPrice
      );
    }

    return filteredResults;
  }, [isActive, isMyVacation, isSoon, minPrice, maxPrice, vacations]);

  // Define a memoized variable to check if there are any results or if the data is still loading
  const hasResults = useMemo(() => isLoading || !!filteredVacations.length,[isLoading, filteredVacations]);
  
  // Calculate the total number of pages based on the totalRows and vacationsPerPage
  const count = Math.ceil(totalRows / vacationsPerPage);
  
  // Fetch vacations data from the service when component mounts or when dependencies change
  useEffect(() => {
    vacationsService
      .getVacations({userId,page: currentPage,isActive,isMyVacation,isSoon, minPrice,maxPrice,})
      .then((data) => {
        // Dispatch action to update vacations state
        dispatch(vacationActionCreators.setVacations(data.vacations));
        // Update totalRows state
        setTotalRows(data.totalRows);
         // Set isLoading state to false
        setIsLoading(false);
      })
      .catch((err) => notify.error(err));
  }, [ userId,currentPage,isActive,isMyVacation,isSoon, minPrice, maxPrice,dispatch,]);

  // Reset currentPage state when filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [isActive, isMyVacation, isSoon, minPrice, maxPrice, setCurrentPage]);

  // Handle page change event
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  
  // Handle price change event
  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  };

  return {
    isLoading,
    isActive,
    isSoon,
    isMyVacation,
    setIsActive,
    setIsMyVacation,
    setIsSoon,
    hasResults,
    filteredVacations,
    count,
    currentPage,
    handleChange,
    maxPrice,
    minPrice,
    handlePriceChange,
  };
};
