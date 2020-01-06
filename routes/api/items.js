const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const Item = require("../../models/Item");
const validateItemInput = require("../../validation/items");

// Gets a list of items for a specific user
router.get("/users/:user_id", (req, res) => {
  Item.find({ user: req.params.user_id })
    .then(items => res.json(items))
    .catch(err => res.status(404).json({ noitemsfound: "No Items found" }));
});

// Add a new item
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateItemInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newItem = new Item({
      user: req.user.id,
      name: req.body.name,
      amount: req.body.amount,
      description: req.body.description
    });

    newItem.save().then(item => res.json(item));
  }
);

// Delete an item
router.delete("/:item_id",
  (req, res) => {
    Item.findByIdAndDelete(req.params._id, (error, data) => {
      if (error) {
        console.log('could not delete item something is wrong');
        return res.status(400).json({message: 'Item is not deleted'})
      } else {
        console.log('deleted');
        return res.json({message: 'Item deleted'});
      }
    })});



module.exports = router;
