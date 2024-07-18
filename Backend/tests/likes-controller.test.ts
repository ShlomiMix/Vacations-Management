import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import { StatusCode } from "../src/3-models/enums";
import { app } from "../src/app";

describe("Testing LikesController", () => {
  let token: string; // Token for login

  // Run once before all following tests:
  before(async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "yosi1000@gmail.com", password: "123456" });
    token = response.body;
  });

  it("Should add like to vacation", async () => {
    const response = await supertest(app.server)
      .post("/api/likes/5/100")
      .set("Authorization", "Bearer " + token);
    expect(response.status).to.be.equal(StatusCode.Created);
  });

  it("Should delete like", async () => {
    const response = await supertest(app.server)
      .delete("/api/likes/5/101")
      .set("Authorization", "Bearer " + token);
    console.log("eden", response.status);

    expect(response.body).to.be.empty;
    expect(response.status).to.be.equal(StatusCode.NoContent);
  });
});
