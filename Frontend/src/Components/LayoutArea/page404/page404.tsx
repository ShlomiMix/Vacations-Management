import  {Alert}  from "@mui/material";
import "./page404.css";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Page404(): JSX.Element {
  const navigate = useNavigate();

  function returnBackToHome() {
    return navigate("/home");
  }

  return (
    <div className="page404">
      <div className="alert-container">
        <Alert severity="warning" className="alert">
        The page was not found. Click the button to return to the home page &nbsp;
          &nbsp;{" "}
          <div onClick={returnBackToHome} className="previous-btn-container">
            {" "}
            <ArrowBackIcon />
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default Page404;
