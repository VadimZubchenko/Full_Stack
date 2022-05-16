const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

let app = express();

let port = process.env.port || 3000;
//Create a database
let database = [];
let id = 100;

app.use(express.static("public"));

// using Express middleware to read json data
app.use(express.json());
// this is wrapp(express json) of app.use, check if the json-application
// httml//localhost:3000/api/contact (/contact is useful for client identification)
app.get("/api/contact", function (req, res) {
  //HTTP 200 the request has succeeded.
  return res.status(200).json(database);
});

// This is backEnd side, express made it like event, so it appear when it's required
// REST architectural style and allows for interaction with RESTful web services.
// app.get app.post(create), app.put(edit), app.delete
app.post("/api/contact", function (req, res) {
  // see in the script 'addToList = async () => {'
  //for instance we get request from script to post data into database,
  //and we are taking object contact data from where in Json-format and making the object here again
  // and then we push object into database
  let contact = {
    id: id,
    firstname: req.body.firstname, // here is 'body' from script.js see: 'body: JSON.stringify(contact)'
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  id++;
  database.push(contact);
  // return what ever we created
  // HTTP 201(создан ресурс) Created Код ответа об успешном статусе указывает,
  // что запрос выполнен успешно и привёл к созданию ресурса.…
  return res.status(201).json(contact);
});

app.delete("/api/contact/:id", function (req, res) {
  // its get in text and parse into integer
  let tempId = parseInt(req.params.id, 10);
  // this return 'contact => contact.id....' if tempDatabase is 'true',
  // it returns contact, else doesn't take
  let tempDatabase = database.filter((contact) => contact.id !== tempId);
  database = tempDatabase;
  //HTTP 200 the request has succeeded.
  return res.status(200).json({ message: "success!" });
});

app.put("/api/contact/:id", function (req, res) {
  let tempId = parseInt(req.params.id, 10);
  for (let i = 0; i < database.length; i++) {
    //skanna kaikki olevia dataadatabase[0].id database[1].id .......
    //database[i].id = [{"id":104,"firstname":"Marcus","email":"a@a.fi","phone":"3423534543"},{"id":105,"firstname":"Marcus","email":"a@a.fi","phone":"3423534543"}]
    if (tempId === database[i].id) {
      let contact = {
        id: tempId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
      };
      database.splice(i, 1, contact);
      return res.status(200).json({ message: "success!" });
    }
  }
  return res.status(404).json({ message: "not found!" });
});

app.listen(port);

console.log("Running in port: " + port);
