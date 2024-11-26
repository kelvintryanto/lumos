if (process.env.NODE_env !== "production") {
  require("dotenv").config();
}
const cors = require("cors");

const express = require("express");
const app = express();
const router = require("./routers");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(router);

module.exports = app;
