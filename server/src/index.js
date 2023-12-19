import express from "express";
import list from "express-list-endpoints";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/users.js";

const server = express();

const port = process.env.PORT || 3030;
server.use(express.json());

//ROUTE DI TEST PER VEDERE SE IL SERVER E' VIVO
server.get("/health", (req, res) => {
  res.status(200).json({ message: "server up!" });
});

//ROUTES UTENTE
//QUESTO POST CREA UN NUOVO UTENTE E HASHA LA PASSW (obbligatorie nel req.body nome cognome email e pssw)
server.post("/profile", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password,
    });

    const { password: _, __v, ...newUserWithoutPassword } = newUser.toObject();
    res.status(201).json(newUserWithoutPassword);
  } catch (err) {
    next(err);
  }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  server.listen(port, () => {
    console.log("😊 Server listening at port:", port);
    console.table(list(server));
  });
});
