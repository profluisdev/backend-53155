import fs from "fs";

class UserManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.getUsers();
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        let usersData = await fs.promises.readFile(this.path, "utf-8");
        this.users = JSON.parse(usersData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(first_name, last_name, age, email) {
    try {
      let newUser = {
        first_name,
        last_name,
        age,
        email,
      };
      this.users.push(newUser);

      fs.promises.writeFile(this.path, JSON.stringify(this.users));
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(email, data) {
    try {
      // Buscamos la posición del user en el array para modificar
      let index = this.users.findIndex((user) => user.email === email);
      console.log(index);
      // Si no no se encuentra el usuario con ese mail devolvemos una respuesta
      if (index === -1) {
        return false;
      }
      this.users[index] = {
        ...this.users[index], // Hacemos una copia del origina
        ...data, // sobre escribimos las propiedades modificadas
      };

      fs.promises.writeFile(this.path, JSON.stringify(this.users));
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(email) {
    try {
      // Buscamos la posición del user en el array para modificar
      let index = this.users.findIndex((user) => user.email === email);
      // Si no no se encuentra el usuario con ese mail devolvemos una respuesta
      if (index === -1) return false;

      this.users = this.users.filter((user) => user.email !== email);
      fs.promises.writeFile(this.path, JSON.stringify(this.users));
      return true
    } catch (error) {
      console.log(error);
    }
  }
}

export const userManager = new UserManager("./data/users.json");
