import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import { StatusCode } from "../src/3-models/enums";
import { app } from "../src/app";

describe("Testing AuthController", () => {
  it("Should register a new user", async () => {
    const response = await supertest(app.server)
      .post("/api/register")
      .send({
        firstName: "Soso",
        lastName: "Cohen",
        email: `Soso${Math.random() * 1000}@gmail.com`,
        password: "123456",
        roleId: 2,
      });
    expect(response.status).to.be.equal(StatusCode.Created);
  });

  it("Should login a user", async () => {
    const response = await supertest(app.server)
      .post("/api/login")
      .send({ email: "yosi1000@gmail.com", password: "123456" });
    expect(response.status).to.be.equal(StatusCode.OK);
  });
});
