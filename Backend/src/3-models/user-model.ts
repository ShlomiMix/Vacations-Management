import Joi from "joi";
import { ValidationError } from "./client-errors";
import { RoleModel } from "./role-model";
export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: number;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static registerValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().min(2).max(35),
    lastName: Joi.string().required().min(2).max(35),
    email: Joi.string().email().required().min(7).max(55),
    password: Joi.string().required().min(4).max(40),
    roleId: Joi.number().optional().equal(RoleModel.Admin, RoleModel.User),
  });

  public registerValidate(): void {
    const result = UserModel.registerValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}
