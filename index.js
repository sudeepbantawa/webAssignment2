const express = require("express");
var bodyParser = require("body-parser");
const app = express();

//initialize mongodb connection
const connection = require("./database/connection");

app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/route");
//routes
app.get("/", (req, res, next) => {
  res.send({ message: "Welcome to backend api" });
});
app.use("/api", routes);

//listen to 8080 port;
app.listen(8080);
