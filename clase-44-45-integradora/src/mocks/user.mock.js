import { fakerES as faker } from "@faker-js/faker";
import { userModel } from "../persistences/mongo/models/user.model.js";

export const generateUsersMocks = (amount) => {
  const users = [];

  for (let i = 0; i < amount; i++) {
    const user = {
      fist_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.number.int({ min: 18, max: 65 }),
    };

    users.push(user);
  }

  userModel.insertMany(users);

  return users;
};
