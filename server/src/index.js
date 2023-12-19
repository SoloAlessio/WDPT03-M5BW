import express from "express"
import list from "express-list-endpoints"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { User } from "./models/users.js"
import jwt from "jsonwebtoken"
import checkJwt from "./middlewares/checkJwt.js"
import multer from "multer"

const server = express()

const port = process.env.PORT || 3030
server.use(express.json())

//Configuro Multer per poter caricare i file
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, callback) {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      callback(null, `${Date.now()}_${file.originalname}`)
    } else {
      const error = new Error("Please upload png or jpg")
      error.statusCode = 500
      callback(error)
    }
  },
})

const upload = multer({ storage })

//Questa PUT permete di caricare una singola immagine sul server nella cartella uploads se si ha il token!
//Requisiti: id e Token
server.put(
  "/:id/image",
  checkJwt,
  upload.single("profile-img"),
  async (req, res, next) => {
    try {
      if (req.file) {
        console.log(req.file.path) // Stampa il percorso dove viene salvato il file
        res
          .status(200)
          .json({ message: "Immagine caricata!", path: req.file.path })
      } else {
        res.status(400).json({ message: "No file uploaded" })
      }
    } catch (error) {
      next(error) // Passa eventuali errori al middleware di gestione degli errori
    }
  }
)

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
//Requisiti body: nessuno, se ne occupa il mdw checkJwt ad estrarre le info dal Token e metterle in req.user
server.get("/me", checkJwt, async (req, res, next) => {
  try {
    // Qui, req.user è già stato impostato dal middleware checkJwt
    res.status(200).json(req.user)
  } catch (err) {
    next(err)
  }
})

//Questo POST carica l'immagine di profilo
server.post

mongoose.connect(process.env.MONGO_URL).then(() => {
  server.listen(port, () => {
    console.log("😊 Server listening at port:", port)
    console.table(list(server))
  })
})
