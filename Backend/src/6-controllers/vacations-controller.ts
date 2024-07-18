import express, { NextFunction, Request, Response } from "express";
import { fileSaver } from "uploaded-file-saver";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacation-model";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { vacationsService } from "../5-services/vacations-service";


class VacationController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  // Register routes:
  private registerRoutes(): void {
    this.router.get("/vacations",securityMiddleware.verifyLoggedIn,this.getAllVacations);
    this.router.get("/vacations/report",securityMiddleware.verifyLoggedIn,securityMiddleware.verifyAdmin,this.getVacationNameAndLikesCount);
    this.router.get("/vacations/:id(\\d+)",securityMiddleware.verifyLoggedIn,securityMiddleware.verifyAdmin,this.getOneVacation);
    this.router.post("/vacations",securityMiddleware.verifyLoggedIn,securityMiddleware.verifyAdmin,this.addVacation);
    this.router.put("/vacations/:id(\\d+)",securityMiddleware.verifyLoggedIn,securityMiddleware.verifyAdmin,this.updateVacation);
    this.router.delete("/vacations/:id(\\d+)",securityMiddleware.verifyLoggedIn,securityMiddleware.verifyAdmin,this.deleteVacation);
    this.router.get("/vacations/images/:imageName", this.getImageFile);
  }

  
  private async getAllVacations(request: Request,response: Response,next: NextFunction): Promise<void> {
    try {
      // Extract query parameters from the request  
      const userId = +request.query.userId;
      const page = +request.query.page;

      // Convert string query parameters to boolean
      const isMyVacation: boolean = request.query.isMyVacation === "true";
      const isSoon: boolean = request.query.isSoon === "true";
      const isActive: boolean = request.query.isActive === "true";

      // Convert string query parameters to numbers or undefined
      const minPriceStr: string | undefined = request.query.minPrice as string;
      const maxPriceStr: string | undefined = request.query.maxPrice as string;
      const minPrice: number | undefined = minPriceStr? parseFloat(minPriceStr): undefined;
      const maxPrice: number | undefined = maxPriceStr? parseFloat(maxPriceStr): undefined;
      
      // Call the vacationsService to get all vacations with the specified parameters
      const vacations = await vacationsService.getAllVacations({userId,page,isActive,isMyVacation,isSoon,minPrice,maxPrice});
      
      // Send JSON response with the vacations data
      response.json(vacations);
    } catch (err: any) {
      // If an error occurs, pass it to the error handling middleware  
      next(err);
    }
  }

  public async getVacationNameAndLikesCount(request: Request,response: Response,next: NextFunction): Promise<void> {
    // Call the vacationsService to get vacation names and likes count
    const vacations = await vacationsService.getVacationNameAndLikesCount();

    // Send JSON response with the vacation data
    response.json(vacations);
  }

  private async getOneVacation(request: Request,response: Response,next: NextFunction): Promise<void> {
    try {
      // Extract vacation id from the request parameters
      const id = +request.params.id;
      
      // Call the vacationsService to get a single vacation by id
      const vacation = await vacationsService.getOneVacation(id);

      // Send JSON response with the vacation data
      response.json(vacation);
    } catch (err: any) {
      // If an error occurs, pass it to the error handling middleware  
      next(err);
    }
  }

  private async addVacation(request: Request,response: Response,next: NextFunction): Promise<void> {
    try {
      // Set the vacation image from the request files  
      request.body.image = request.files?.image;

      // Create a new VacationModel instance with the request body
      const vacation = new VacationModel(request.body);

      // Call the vacationsService to add a new vacation
      const addedVacation = await vacationsService.addVacation(vacation);

      // Send JSON response with the added vacation data and set status to Created (201)
      response.status(StatusCode.Created).json(addedVacation);
    } catch (err: any) {
      // If an error occurs, pass it to the error handling middleware  
      next(err);
    }
  }

  private async updateVacation(request: Request,response: Response,next: NextFunction): Promise<void> {
    try {
      // Set the vacation id from the request parameters
      request.body.id = +request.params.id;

      // Set the vacation image from the request files
      request.body.image = request.files?.image;

      // Create a new VacationModel instance with the updated request body
      const vacation = new VacationModel(request.body);

      // Call the vacationsService to update the vacation
      const updatedVacation = await vacationsService.updateVacation(vacation);

      // Send JSON response with the updated vacation data
      response.json(updatedVacation);
    } catch (err: any) {
       // If an error occurs, pass it to the error handling middleware
      next(err);
    }
  }

  private async deleteVacation(request: Request,response: Response,next: NextFunction): Promise<void> {
    try {
      // Extract vacation id from the request parameters  
      const id = +request.params.id;
      
       // Call the vacationsService to delete the vacation
      await vacationsService.deleteVacation(id);

      // Send No Content response (204) indicating successful deletion
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
       // If an error occurs, pass it to the error handling middleware  
      next(err);
    }
  }

  private async getImageFile(request: Request,response: Response,next: NextFunction): Promise<void> {
    try {
      // Extract image name from the request parameters  
      const imageName = request.params.imageName;

      // Get the file path for the image
      const imagePath = fileSaver.getFilePath(imageName, true);

      // Send the image file as a response
      response.sendFile(imagePath);
    } catch (err: any) {
      // If an error occurs, pass it to the error handling middleware
      next(err);
    }
  }
}

const vacationController = new VacationController();
export const vacationRouter = vacationController.router;
