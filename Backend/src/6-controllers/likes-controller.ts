import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { likeService } from "../5-services/likes-service";

class LikesController {
    public readonly router = express.Router();

    // register routes once:
    public constructor() {
      this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.post("/likes/:userId(\\d+)/:vacationId(\\d+)", this.addLike);
        this.router.delete("/likes/:userId(\\d+)/:vacationId(\\d+)", this.deleteLike);
      }


      private async addLike(request: Request, response:Response, next: NextFunction) :Promise<void> {
        try {
            // Extract userId and vacationId from request parameters and convert them to numbers
            const userId = +request.params.userId
            const vacationId = +request.params.vacationId

            // Call the likeService to add a like for the specified user and vacation
            await likeService.addLike(userId,vacationId)

            // Send a response with status Created (201)
            response.sendStatus(StatusCode.Created)
        }
        catch(err:any) {
            // If an error occurs, pass it to the error handling middleware
            next(err)
        }
    } 

    
    private async deleteLike(request: Request, response:Response, next: NextFunction) :Promise<void> {
        try {
            // Extract userId and vacationId from request parameters and convert them to numbers
            const userId = +request.params.userId
            const vacationId = +request.params.vacationId

            // Call the likeService to delete a like for the specified user and vacation
            await likeService.deleteLike(userId,vacationId)

            // Send a response with status No Content (204)
            response.sendStatus(StatusCode.NoContent)
        }
        catch(err:any) {
            next(err)
        }
    } 
}

const likesController = new LikesController()
export const likesRouter = likesController.router