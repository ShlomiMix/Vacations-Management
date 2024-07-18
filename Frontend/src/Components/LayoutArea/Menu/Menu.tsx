import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../Redux/Store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {
  const adminRole = useAppSelector((state) => state.user?.roleId === 1);

  return (
    <div className="Menu">
      <Box sx={{ flexGrow: 1, mt: 0 }}>
        {adminRole && (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" component="div" sx={{ p: 1 }}>
                <NavLink to="/layout/home">Home</NavLink>
              </Typography>

              <Typography variant="h6" component="div" sx={{ p: 1 }}>
                <NavLink to="/layout/vacation/new">Add Vacation</NavLink>
              </Typography>

              <Typography variant="h6" component="div" sx={{ p: 1 }}>
                <NavLink to="/layout/vacations/report">Reports</NavLink>
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        <Box
          sx={{ m: 2 }}
          display={"flex"}
          height={40}
          width={"100"}
          alignItems={"start"}
          justifyContent={"right"}
        >
          <AuthMenu />
        </Box>
      </Box>
    </div>
  );
}

export default Menu;
