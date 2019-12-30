const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.ATLAS_URI;

app.get("/", (req, res) => res.send("hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
