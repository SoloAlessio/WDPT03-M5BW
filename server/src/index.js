import express from "express"
import list from "express-list-endpoints"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { User } from "./models/users.js"
import jwt from "jsonwebtoken"
import checkJwt from "./middlewares/checkJwt.js"

const server = express()

const port = process.env.PORT || 3030
server.use(express.json())

//ROUTE DI TEST PER VEDERE SE IL SERVER E' VIVO
server.get("/health", (req, res) => {
  res.status(200).json({ message: "server up!" })
})

//ROUTES UTENTE-----------------------------------------------------------------

//Questo POST crea un nuovo utente, hasha la password, e resituisce subito il token (farlo al login sarebbe stato meglio?)
//Requisiti body: name surname email password
server.post("/profile", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10)

    const newUser = await User.create({
      ...req.body,
      password,
    })

    const token = jwt.sign({ userId: newUser._id }, process.env.MY_SECRET, {
      expiresIn: "2h",
    })

    const { password: _, __v, ...newUserWithoutPassword } = newUser.toObject()
    res.status(201).json({ user: newUserWithoutPassword, token })
  } catch (err) {
    next(err)
  }
})

//QUESTO GET RESTITUISCE TUTTI GLI UTENTI (senza pssw, id e versione)
//Requisiti body: nessuno
server.get("/profile", async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password -_id -__v")
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

//Questo GET ritorna il profile dell'utente LOGGATO. Qui viene controllato il token
//Requisiti: serve il token nelle Authorization!
//Requisiti body: nessuno, se ne occupa il mdw checkJwt ad estrarre le info dal Token
server.get("/me", checkJwt, async (req, res, next) => {
  try {
    // Qui, req.user è già stato impostato dal middleware checkJwt
    res.status(200).json(req.user)
  } catch (err) {
    next(err)
  }
})

mongoose.connect(process.env.MONGO_URL).then(() => {
  server.listen(port, () => {
    console.log("😊 Server listening at port:", port)
    console.table(list(server))
  })
})
