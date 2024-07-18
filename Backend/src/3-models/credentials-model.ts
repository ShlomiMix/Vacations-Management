import Joi from "joi";
import { ValidationError } from "./client-errors";
export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  private static loginValidationSchema = Joi.object({
    email: Joi.string().required().email().min(7).max(55),
    password: Joi.string().required().min(4).max(40),
  });

  public loginValidate(): void {
    const result = CredentialsModel.loginValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
