const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const dotenv = require('dotenv');

// To be able to use .env file
dotenv.config();

// DB and Port configs
const db = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

// Routes
const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", users);
app.use("/api/items", items);
app.use(passport.initialize());

app.listen(port, () => console.log(`Server is running on port ${port}`));

console.log(db)
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));





