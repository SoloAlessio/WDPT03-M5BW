import express from "express";
import list from "express-list-endpoints";

const server = express();

const port = process.env.PORT || 3030;

server.get("/", (req, res) => {
  res.status(200).json({ message: "server up!" });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  server.listen(port, () => {
    console.log("😊 Server listening at port:", port);
    console.table(list(server));
  });
});
