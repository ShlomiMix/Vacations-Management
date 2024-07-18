export class LikeModel {
  userId: number;
  vacationId: number;

  public constructor(userId: number, vacationId: number) {
    this.userId = userId;
    this.vacationId = vacationId;
  }
}
