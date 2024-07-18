import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { notify } from "../../../Utils/Notify";
import { authService } from "../../../Services/AuthService";
import { createTheme} from "@mui/material";
import { CredentialsModel } from "../../../Models/CredentialsModel";

export const useLogin = () => {
  const { register, handleSubmit } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  const defaultTheme = createTheme();

  async function onSubmit(credentials: CredentialsModel) {
    try {
      const { firstName, lastName } = await authService.login(credentials);
      navigate("/layout");
      notify.success(`Welcome Back ${firstName} ${lastName}`);
    } catch (err: any) {
      notify.error(err);
    }
  }

  return {
    onSubmit,
    defaultTheme,
    register,
    handleSubmit,
  };
};
