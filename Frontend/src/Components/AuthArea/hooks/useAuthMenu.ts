import { useNavigate } from "react-router";
import { useAppSelector } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";
import { authService } from "../../../Services/AuthService";

export const useAuthMenu = () => {
  const firstName = useAppSelector((state) => state.auth?.firstName);
  const lastName = useAppSelector((state) => state.auth?.lastName);

  const navigate = useNavigate();

  function logMeOut(): void {
    notify.success(`Good Bye ${firstName} ${lastName}`);
    authService.logOut();
    navigate("/login");
  }

  if (!firstName) {
    return;
  }

  return {
    firstName,
    lastName,
    logMeOut,
  };
};
