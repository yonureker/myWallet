require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

const users = require("./routes/api/users");
const items = require("./routes/api/items");

app.get("/", (req, res) => res.send("hello"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/items", items);

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
