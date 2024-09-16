import { expect } from "chai";
import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import mongoose from "mongoose";
import { userModel } from "../src/persistences/mongo/models/user.model.js";
mongoose.connect(envConfig.MONGO_URL);

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test de session", () => {
    it("[POST] /api/session/register  este endpoint debe registrar un usuario", async () => {
        const newUser = {
            first_name: "User test",
            last_name: "Test",
            email: "user-test@test.com",
            password: "123",
            age: 20,
        };

        const { status, _body, ok } = await requester.post("/api/session/register").send(newUser);
        expect(status).to.be.equal(201);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal("success");
    });

    let cookie;
    it("[POST] /api/session/login  este endpoint debe loguear un usuario", async () => {
        const loginUser = {
            email: "user-test@test.com",
            password: "123",
        };

        const { status, _body, ok, headers } = await requester.post("/api/session/login").send(loginUser);
        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };

        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.first_name).to.be.equal("User test");
        expect(_body.payload.email).to.be.equal("user-test@test.com");
        expect(_body.payload.role).to.be.equal("user");
    });

    it("[GET] /api/session/current  este endpoint debe mostrar la información del usuario un usuario", async () => {
        const { status, _body, ok } = await requester.get("/api/session/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.email).to.be.equal("user-test@test.com");
        expect(_body.payload.role).to.be.equal("user");
    });

    after(async () => {
        await userModel.deleteOne({ email: "user-test@test.com" });
        mongoose.disconnect();
    });
});
