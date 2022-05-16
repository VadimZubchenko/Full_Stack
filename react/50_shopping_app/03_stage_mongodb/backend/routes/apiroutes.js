const express = require("express");

let router = express.Router();

//DATABASE

const database = [];
let id = 100;

//REST API

router.get("/shopping", function (req, res) {
  // here we personalize database for particular user
  let tempDatabase = database.filter((item) => item.user === req.session.user);
  return res.status(200).json(tempDatabase);
});

router.post("/shopping", function (req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }
  // if there a type of item like 'banaani'
  if (!req.body.type) {
    return res.status(400).json({ message: "Bad request" });
  }
  let item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
    id: id,
    user: req.session.user,
  };
  id++;
  database.push(item);
  return res.status(201).json(item);
});

router.delete("/shopping/:id", function (req, res) {
  let tempId = parseInt(req.params.id, 10);
  for (let i = 0; i < database.length; i++) {
    if (tempId === database[i].id) {
      if (req.session.user !== database[i].user) {
        database.splice(i, 1);
        return res
          .status(409)
          .json({ message: "You are not authorized to remove this item" });
      }
      database.splice(i, 1);
      return res.status(200).json({ message: "Success!" });
    }
  }
  return res.status(404).json({ message: "not found" });
});

router.put("/shopping/:id", function (req, res) {
  let tempId = parseInt(req.params.id, 10);
  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }
  if (!req.body.type) {
    return res.status(400).json({ message: "Bad request" });
  }
  let item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
    id: tempId,
    user: req.session.user,
  };
  for (let i = 0; i < database.length; i++) {
    if (tempId === database[i].id) {
      if (req.session.user !== database[i].user) {
        return res
          .status(409)
          .json({ message: "You are not authorized to remove this item" });
      }
      database.splice(i, 1, item);
      return res.status(200).json({ message: "Success!" });
    }
  }
  return res.status(404).json({ message: "not found" });
});

module.exports = router;
