const express = require("express");

let app = express();

//express.json() is a built in middleware function
// It parses incoming JSON requests and
// puts the parsed data in req.body.

app.use(express.json());

//DATABASE which we set locally,

const database = [];
let id = 100;

//HELPERS port for frontEnd proxy

const port = process.env.port || 3001;

//REST API which helps get, post....on local server.
app.get("/api/shopping", function (req, res) {
  return res.status(200).json(database);
});
// req includes body with item from app.js
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
  // adding item(type, count, price, id) into array
  database.push(item);
  return res.status(201).json(item);
});

app.delete("/api/shopping/:id", function (req, res) {
  let tempId = parseInt(req.params.id, 10); //change json to int: parseInt converts string to int
  for (let i = 0; i < database.length; i++) {
    if (tempId === database[i].id) {
      database.splice(i, 1); // splice removes element from array
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
      //'item'-elements here is a new one put in place of the removed item
      database.splice(i, 1, item);
      return res.status(200).json({ message: "Success!" });
    }
  }
  return res.status(404).json({ message: "not found" });
});

app.listen(port);
console.log("Running on port ", port);
