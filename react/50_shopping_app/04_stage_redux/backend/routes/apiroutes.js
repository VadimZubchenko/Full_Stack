const express = require("express");
const itemModel = require("../models/item");

let router = express.Router();

//DATABASE

const database = [];
let id = 100;

//REST API

router.get("/shopping", function (req, res) {
  // here we personalize database for particular user
  let query = { user: req.session.user };
  itemModel.find(query, function (err, items) {
    if (err) {
      console.log("Error when querying item. Reason:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(items);
  });
});

router.post("/shopping", function (req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }
  // if there a type of item like 'banaani'
  if (!req.body.type) {
    return res.status(400).json({ message: "Bad request" });
  }
  let item = new itemModel({
    type: req.body.type,
    count: req.body.count,
    price: req.body.price,
    user: req.session.user,
  });
  item.save(function (err) {
    if (err) {
      console.log("Failed to save item. Reaon:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(201).json({ message: "succes" });
  });
  // muutettava mongondb kannalta, kun täässä emme käytetään id,
  // in local version we used id++;
  // eli poistettiin id ja luotiin virtuali id
});

router.delete("/shopping/:id", function (req, res) {
  itemModel.deleteOne(
    { _id: req.params.id, user: req.session.user },
    function (err) {
      if (err) {
        console.log("Failed to remove item. Reason:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "success" });
    }
  );
});

router.put("/shopping/:id", function (req, res) {
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
    user: req.session.user,
  };
  itemModel.replaceOne(
    { _id: req.params.id, user: req.session.user },
    item,
    function (err) {
      if (err) {
        console.log("Failed to remove item. Reason:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "success" });
    }
  );
});

module.exports = router;
