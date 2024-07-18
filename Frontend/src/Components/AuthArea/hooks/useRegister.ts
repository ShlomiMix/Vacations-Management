import { createTheme}  from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserModel } from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";

export const useRegister = () => {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  const defaultTheme = createTheme();

  const getTokenFromSessionStorage = () => {
    return sessionStorage.getItem("token");
  };

  function getFirstNameAndLastNameFromToken(token: string): void {
    const decodedToken: { exp: number; iat: number; user: UserModel } =
      jwtDecode(token);
    const { firstName, lastName } = decodedToken.user;
    notify.success(`Welcome ${firstName} ${lastName}`);
  }

  async function send(user: UserModel) {
    try {
      await authService.register(user);
      const token: string = getTokenFromSessionStorage();
      getFirstNameAndLastNameFromToken(token);
      navigate("/layout");
    } catch (err: any) {
      notify.error(err);
    }
  }

  const onSubmit = (data: UserModel) => {
    send(data);
  };

  return {
    onSubmit,
    send,
    defaultTheme,
    register,
    handleSubmit,
  };
};
