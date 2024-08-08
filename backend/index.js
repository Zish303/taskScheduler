const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const todo = require("./routes/todo");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", user);
app.use("/todo", todo);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening to ", port);
});
