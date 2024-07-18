import axios from "axios";
import { LikeModel } from "../Models/LikeModel";
import { appConfig } from "../Utils/AppConfig";

class LikesService {

  // This method adds a like for a specific user and vacation.  
  public async addLike(userId: number, vacationId: number): Promise<void> {
    // Send a POST request to the likes URL with the user ID and vacation ID concatenated.
    await axios.post<LikeModel>(`${appConfig.likesUrl}${userId}/${vacationId}`);
  }
  
  // This method deletes a like for a specific user and vacation.
  public async deleteLike(userId: number, vacationId: number): Promise<void> {
    // Send a DELETE request to the likes URL with the user ID and vacation ID concatenated.
    await axios.delete<LikeModel>(`${appConfig.likesUrl}${userId}/${vacationId}`);
  }
}

export const likesService = new LikesService();
