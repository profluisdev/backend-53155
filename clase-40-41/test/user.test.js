import mongoose from "mongoose";
import envConfig from "../src/config/env.config.js";
import userRepository from "../src/persistences/mongo/repositories/user.repository.js";
import { expect } from "chai";

mongoose.connect(envConfig.MONGO_URL);

describe("Test User Repository", () => {
    // esta función ejecuta todos los test

    // before(() => {
    //     console.log("Se ejecuta antes de todos los test");
    // })

    // beforeEach(() => {
    //     console.log("Se ejecuta antes de cada test que tenemos");
    // })

    it("Obtener todos los usuarios", async () => {
        const users = await userRepository.getAll();
        expect(users).to.be.an("array");
    });

    let userId;
    let userEmail;

    it("Crear un usuario", async () => {
        const newUser = {
            first_name: "User test",
            last_name: "Test",
            email: "user-test@test.com",
            password: "123",
            age: 20,
        };

        const user = await userRepository.create(newUser);
        userId = user._id;
        userEmail = user.email;

        expect(user.first_name).to.equal("User test");
        expect(user.last_name).to.equal("Test");
        expect(user.email).to.equal("user-test@test.com");
        expect(user.password).to.equal("123");
        expect(user.role).to.equal("user");
    });

    it("Obtener un usuario por id", async () => {
        const user = await userRepository.getById(userId);
        expect(user).to.be.an("object");
        expect(user.email).to.equal("user-test@test.com");
        expect(user.password).to.not.equal("dsfafasdf");
        expect(user.password).to.not.an("number");
    });

    it("Obtener un usuario por email", async () => {
        const user = await userRepository.getByEmail(userEmail);
        expect(user).to.be.an("object");
        expect(user.email).to.equal("user-test@test.com");
        expect(user.password).to.not.equal("dsfafasdf");
        expect(user.password).to.not.an("number");
    });

    it("Actualizar usuario", async () => {
        const user = await userRepository.update(userId, {
            first_name: "User Update",
            last_name: "Update",
            age: 50,
        });
        expect(user.first_name).to.equal("User Update");
        expect(user.last_name).to.equal("Update");
        expect(user.age).to.not.equal(20);
    });

    it("Eliminar un usuario por id", async () => {
        await userRepository.deleteOne(userId);
        const user = await userRepository.getById(userId);
        expect(user).to.be.null;
    });

    after(async () => {
        console.log("Se ejecuta al finalizar todos los test");
        mongoose.disconnect();
    });

    // afterEach(() => {
    //     console.log("Se ejecuta al finalizar cada test");
    // })
});
