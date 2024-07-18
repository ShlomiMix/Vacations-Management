import { expect } from "chai";
import fs from "fs";
import { describe, it } from "mocha";
import supertest from "supertest";
import { StatusCode } from "../src/3-models/enums";
import { VacationModel } from "../src/3-models/vacation-model";
import { app } from "../src/app";

describe("Testing VacationsController", () => {
  let image: Buffer; // The Image to send.
  let token: string; // Token for login

  // Run once before all following tests:
  before(async () => {
    image = fs.readFileSync(__dirname + "\\resources\\brazil.jpg");
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "shlomi10000@gmail.com", password: "123456" });
    token = response.body;
  });

  it("Should return vacations array", async () => {
    const response = await supertest(app.server)
      .get(
        "/api/vacations?userId=4&page=1&isActive=false&isSoon=false&isMyVacation=false&minPrice=1&maxPrice=10000"
      )
      .set("Authorization", "Bearer " + token);
    const vacations: VacationModel[] = response.body.vacations;
    expect(vacations.length).to.be.greaterThanOrEqual(1);

    expect(vacations[0]).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("Should return a single vacation", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations/99")
      .set("Authorization", "Bearer " + token);
    const vacation: VacationModel = response.body;
    expect(vacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price",
      "imageName",
      "imageUrl"
    );
  });

  it("Should add a new vacation", async () => {
    const response = await supertest(app.server)
      .post("/api/vacations")
      .set("Authorization", "Bearer " + token)
      .field("destination", "Brazil")
      .field(
        "description",
        "Brazil is a country with spectacular views, the most beautiful beaches in the world and luxurious hotels"
      )
      .field("startDate", "2024-08-10")
      .field("endDate", "2024-08-14")
      .field("price", 2500)
      .field("image", image);

    const addedVacation = response.body;

    expect(addedVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price"
    );
  });

  it("Should update a vacation by id", async () => {
    const response = await supertest(app.server)
      .put("/api/vacations/100")
      .set("Authorization", "Bearer " + token)
      .field("destination", "Brazil")
      .field(
        "description",
        "Brazil is a country with spectacular views, the most beautiful beaches in the world and luxurious hotels"
      )
      .field("startDate", "2024-08-05")
      .field("endDate", "2024-08-09")
      .field("price", 4500)
      .field("image", image);

    const updatedVacation = response.body;

    expect(updatedVacation).to.contain.keys(
      "id",
      "destination",
      "description",
      "startDate",
      "endDate",
      "price"
    );
  });

  it("Should delete vacation by id", async () => {
    const response = await supertest(app.server)
      .delete("/api/vacations/115")
      .set("Authorization", "Bearer " + token);

    expect(response.body).to.be.empty;
    expect(response.status).to.be.equal(StatusCode.NoContent);
  });
});
