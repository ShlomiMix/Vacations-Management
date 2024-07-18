import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../../HomeArea/Home/Home";
import { useAppSelector } from "../../../../Redux/Store";
import AddVacation from "../../../VacationArea/AddVacation/AddVacation";
import EditVacation from "../../../VacationArea/EditVacation/EditVacation";
import VacationsReport from "../../../VacationsReportsArea/VacationsReport/VacationsReport";
import Page404 from "../../page404/page404";

function Routing(): JSX.Element {
  const adminRole = useAppSelector((state) => state?.user?.roleId === 1);

  return (
    <div className="Routing">
      <Routes>
        {/* Home: */}
        <Route path="/home" element={<Home />} />

        {/* Add: */}
        <Route
          path="/vacation/new"
          element={adminRole ? <AddVacation /> : <Navigate to="/error" />}
        />

        {/* Edit */}
        <Route
          path="/vacation/edit/:id"
          element={adminRole ? <EditVacation /> : <Navigate to="/error" />}
        />

        {/* Reports */}
        <Route
          path="/vacations/report"
          element={adminRole ? <VacationsReport /> : <Navigate to="/error" />}
        />

        {/* Page not found route: */}
        <Route path="/*" element={<Page404 />} />

        {/* Default Route: */}
        <Route path="/" element={<Navigate to="/layout/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
