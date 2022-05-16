const express = require("express");

let app = express();

app.use(express.json());

//DATABASE

const database = [];
let id = 100;

//HELPERS

const port = process.env.port || 3001;

//REST API

app.get("/api/shopping", function (req, res) {
  return res.status(200).json(database);
});

app.post("/api/shopping", function (req, res) {
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
    id: id,
  };
  id++;
  database.push(item);
  return res.status(201).json(item);
});

app.delete("/api/shopping/:id", function (req, res) {
  let tempId = parseInt(req.params.id, 10);
  for (let i = 0; i < database.length; i++) {
    if (tempId === database[i].id) {
      database.splice(i, 1);
      return res.status(200).json({ message: "Success!" });
    }
  }
  return res.status(404).json({ message: "not found" });
});

app.put("/api/shopping/:id", function (req, res) {
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
  };
  for (let i = 0; i < database.length; i++) {
    if (tempId === database[i].id) {
      database.splice(i, 1, item);
      return res.status(200).json({ message: "Success!" });
    }
  }
  return res.status(404).json({ message: "not found" });
});

app.listen(port);
console.log("Running on port ", port);
