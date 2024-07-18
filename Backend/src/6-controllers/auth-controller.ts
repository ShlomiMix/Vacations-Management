import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { authService } from "../5-services/auth-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";

class AuthController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
  }

  private async register(request: Request,response: Response, next: NextFunction): Promise<void> {
    try {
      // Create a new user model instance with the request body
      const user = new UserModel(request.body);

      // Register the user and get the authentication token
      const token = await authService.register(user);

      // Respond with the authentication token and set the status to Created (201)
      response.status(StatusCode.Created).json(token);
    } catch (err: any) {
      // If an error occurs, pass it to the error handling middleware
      next(err);
    }
  }

  private async login(request: Request,response: Response, next: NextFunction): Promise<void> {
    try {
      // Create a new credentials model instance with the request body
      const credentials = new CredentialsModel(request.body);

      // Log in the user and get the authentication token
      const token = await authService.login(credentials);

      // Respond with the authentication token
      response.json(token);
    } catch (err: any) {
      // If an error occurs, pass it to the error handling middleware
      next(err);
    }
  }
}

const authController = new AuthController();
export const authRouter = authController.router;
