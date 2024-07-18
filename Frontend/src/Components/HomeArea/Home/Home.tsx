import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FilterButtons from "../Components/FilterButtons/FilterButtons";
import VacationCard from "../Components/VacationCard/VacationCard";
import { useHome } from "../hooks/useHome";
import "./Home.css";
import useTitle from "../../../Utils/UseTitle";

function Home(): JSX.Element {
  const {
    count,
    currentPage,
    filteredVacations,
    handleChange,
    hasResults,
    isActive,
    isLoading,
    isMyVacation,
    isSoon,
    setIsActive,
    setIsMyVacation,
    setIsSoon,
    handlePriceChange,
    minPrice,
    maxPrice,
  } = useHome();

  useTitle("Home")

  if (isLoading) {
    return (
      <div className="loader">
        Loading
        <span></span>
      </div>
    );
  }

  return (
    <div className="Home">
      <div className="home-grid">
        <aside>
          <FilterButtons
            isMyVacation={isMyVacation}
            isActive={isActive}
            isSoon={isSoon}
            setIsActive={setIsActive}
            setIsMyVacation={setIsMyVacation}
            setIsSoon={setIsSoon}
            onPriceChange={handlePriceChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </aside>

        <main>
          <h3>Vacations</h3>
          {!hasResults ? (
            <div className="no-results">
              <div className="no-results-text">
                No results were found for this filter
              </div>
            </div>
          ) : (
            <div className="home-content">
              <div className="vacations-container">
                {filteredVacations.map((v) => (
                  <VacationCard vacation={v} key={v.id} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="pagination-container">
        <Stack spacing={2}>
          <Pagination
            count={count}
            page={currentPage}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Home;
