import { Router } from "express";


const router = Router();

router.get("/home", (req, res) => {

  let person = {
    name: "Juan",
    lastName: "Perez"
  };


  res.render("home", person);
  
})

router.get("/users", (req, res) => {

  let users = [
    {
      name: "Juan",
      lastName: "Perez",
    },
    {
      name: "Pedro",
      lastName: "Sanchez",
    },
    {
      name: "Ana",
      lastName: "Diaz",
    },
  ];

  res.render("users", {users});
  
})

export default router;