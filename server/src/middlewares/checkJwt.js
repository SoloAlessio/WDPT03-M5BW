import jwt from "jsonwebtoken"
import { User } from "../models/users.js"

//Questo mdw legge il token inserito nella richiesta, se tutto va bene si passa al mdw successivo
const checkJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, process.env.MY_SECRET)

    req.user = await User.findById(payload.userId).select("-password")

    if (!req.user) {
      return res.status(404).json({ message: "User not found" })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export default checkJwt
