import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuthMenu } from "../hooks/useAuthMenu";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
  const { firstName, lastName, logMeOut } = useAuthMenu();

  return (
    <div className="AuthMenu">
      <div className="full-name-container">
        <span>
          Hello {firstName} {lastName} &nbsp;{" "}
        </span>
        <span>
          <NavLink to="/login" onClick={logMeOut}>
            <Button
              className="logout-button"
              size="small"
              color="secondary"
              variant="contained"
            >
              Logout <LogoutSharpIcon fontSize="small" />
            </Button>
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default AuthMenu;
