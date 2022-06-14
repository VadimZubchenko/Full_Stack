const express = require("express");
// express.Router instance is a complete middleware and routing system
//creates a router as a module, loads a middleware function in it,
//defines some routes, and mounts the router module on a path in the main app (app.use).
let router = express.Router();

//DATABASE

const database = [];
let id = 100;

//REST API
// here we got from server.js changed req like req.session.user
router.get("/shopping", function (req, res) {
  // personalize database[item] for particular user
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
  // here we give the user to his product and so
  let item = {
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
    id: id,
    user: req.session.user,
  };
  id++;
  // now database includes the partucular user
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
          .status(409) //request conflict with the current state of the target resource
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
