const express = require("express");
const mongoose = require("mongoose");
const heroModel = require("./heroModel");
const app = express();
const cors = require("cors");
const Hero = require("./heroModel");

const ALLOWED_ORIGINS = ["http://localhost:4200", "http://localhost:3000"];
const MONGODB_URI = "mongodb://localhost:27017/heroes";
const PORT = process.env.PORT || 3001;

const database = "HEROES";
const collection = "HERO";

app.use(cors(ALLOWED_ORIGINS));

const hero = new heroModel({ name: "Dr Nice" });
hero.save();
const hero2 = new heroModel({ name: "Narco" });
hero2.save();
const hero3 = new heroModel({ name: "Bombasto" });
hero3.save();
const hero4 = new heroModel({ name: "Celeritas" });
hero4.save();
const hero5 = new heroModel({ name: "Magneta" });
hero5.save();
const hero6 = new heroModel({ name: "RubberMan" });
hero6.save();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(express.json());
// API
app.get("/heroes/", async (request, response) => {
  const heroes = await heroModel.find({});

  try {
    response.send(heroes);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/heroes/", async (request, response) => {
  const hero = new heroModel(request.body);

  try {
    await hero.save();
    response.send(hero);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/heroes/:id", async (req, res) => {
  console.log("_id: ", req.params.id);
  const deletedHero = await Hero.findByIdAndDelete(req.params.id);
  res.json(deletedHero);
});

app.listen(PORT);
console.log("Server is running in port: " + PORT);
//*********************** - SQL LITE version -********************/

// const sqlite3 = require("sqlite3");
// const express = require("express");
// const cors = require("cors");

// var bodyParser = require("body-parser");

// var app = express();
// app.use(cors());
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// const HTTP_PORT = 8000;
// app.listen(HTTP_PORT, () => {
//   console.log("Server is listening on port " + HTTP_PORT);
// });

// process.on("SIGINT", function () {
//   console.log("Do not shut down the app on user log-off");
//   server.close();
// });

// const db = new sqlite3.Database("./emp_database.db", (err) => {
//   if (err) {
//     console.error("Erro opening database " + err.message);
//   } else {
//     db.run(
//       "CREATE TABLE heroes( \
//             id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
//             name NVARCHAR(20)  NOT NULL\
//         )",
//       (err) => {
//         if (err) {
//           console.log("Table already exists.");
//           return;
//         }
//         let insert = "INSERT INTO heroes (name) VALUES (?)";
//         db.run(insert, ["Dr Nice"]);
//         db.run(insert, ["Narco"]);
//         db.run(insert, ["Bombasto"]);
//         db.run(insert, ["Celeritas"]);
//         db.run(insert, ["Magneta"]);
//         db.run(insert, ["RubberMan"]);
//       }
//     );
//   }
// });

// app.get("/heroes/:id", (req, res, next) => {
//   var params = [req.params.id];
//   console.log("Get hero: ", params);
//   db.get("SELECT * FROM heroes where id = ?", [req.params.id], (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.status(200).json(row);
//   });
// });

// app.get("/heroes/", (req, res, next) => {
//   console.log("get params", [req.query]);
//   if (req.query && req.query.name) {
//     search = "%" + req.query.name + "%";
//   } else {
//     search = "%";
//   }
//   db.all("SELECT * FROM heroes where name like ?", [search], (err, rows) => {
//     if (err) {
//       console.log(err.message);
//       res.status(400).json({ error: "sql error" });
//       return;
//     }
//     res.status(200).json(rows);
//   });
// });

// app.post("/heroes/", (req, res, next) => {
//   var reqBody = req.body;
//   console.log("Added: ", reqBody);
//   db.run(
//     "INSERT INTO heroes (name) VALUES (?)",
//     [reqBody.name],
//     function (err, result) {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.status(201).json({
//         id: this.lastID,
//         name: reqBody.name,
//       });
//     }
//   );
// });

// app.put("/heroes", (req, res, next) => {
//   var reqBody = req.body;
//   var hero = [reqBody.name, reqBody.id];
//   console.log("Put: ", hero);
//   db.run(
//     `UPDATE heroes set name = ? WHERE id = ?`,
//     hero,
//     function (err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
//       res.status(200).json({ updatedID: this.changes });
//     }
//   );
// });

// app.delete("/heroes/:id", (req, res, next) => {
//   db.run(
//     `DELETE FROM heroes WHERE id = ?`,
//     req.params.id,
//     function (err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
//       res.status(200).json({ deletedID: this.changes });
//     }
//   );
// });
