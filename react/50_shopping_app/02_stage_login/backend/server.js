const express = require("express");
const apiroutes = require("./routes/apiroutes");
//for changing a password to hash code
const bcrypt = require("bcrypt");
//for creationg token
const crypto = require("crypto");

let app = express();

app.use(express.json());

const port = process.env.port || 3001;

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
// 60.0 Minutes (mins) kun session kestää enemmään kuin tunti,
//sitten 'you will kick out from session!'
let time_to_life_diff = 3600000;

//HELPERS AND MIDDLWARE

createToken = () => {
  let token = crypto.randomBytes(128);
  return token.toString("hex");
};
// FILTER for DATABASE PASSING, check do you have key(token)
isUserLogged = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).json({ message: "Forbidden 1!" });
  }
  for (let i = 0; i < loggedSessions.length; i++) {
    if (req.headers.token === loggedSessions[i].token) {
      let now = Date.now();
      if (now > loggedSessions[i].ttl) {
        // delete session if time is out, splice remove 1 element from []
        loggedSessions.splice(i, 1);
        return res.status(403).json({ message: "Forbidden 2!" });
      }
      // we reset timer and start from present time
      loggedSessions[i].ttl = now + time_to_life_diff;
      req.session = {};
      req.session.user = loggedSessions[i].user;
      return next();
    }
  }
  return res.status(403).json({ message: "Forbidden 3!" });
};

// LOGIN API
// here we register user and password and
// change a password to hash (numeroinen salasana)

app.post("/register", function (req, res) {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Please provide proper credinteials" });
  }
  // Tarkistaa onko luotu username ja salasana
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide proper credintials" });
  }
  // tarkista ovatko käyttäjä ja salasana riittävä pitkää
  if (req.body.username.length < 4 || req.body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Please provide proper credintials" });
  }
  // ovatko username registerioitu aikasemmin in registeredUsers[]
  for (let i = 0; i < registeredUsers.length; i++) {
    if (req.body.username === registeredUsers[i].username) {
      return res.status(409).json({ message: "Username already in use" });
    }
  }
  bcrypt.hash(req.body.password, 14, function (err, hash) {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    let user = {
      username: req.body.username,
      password: hash,
    };
    registeredUsers.push(user);
    console.log(registeredUsers);
    return res.status(201).json({ message: "Register success!" });
  });
});

//here tartkistetaan username ja salasana
//and make token for this session(username, token) of this particular user
app.post("/login", function (req, res) {
  //to check req.body empty or not in node ,express?
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  // onko käyttäjä ja salasana ovat olemassa
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  // onko username ja salasana riittävästi pitkiä
  if (req.body.username.length < 4 || req.body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  for (let i = 0; i < registeredUsers.length; i++) {
    if (req.body.username === registeredUsers[i].username) {
      bcrypt.compare(
        req.body.password,
        registeredUsers[i].password,
        function (err, success) {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          if (!success) {
            return res.status(401).json({ message: "Unauthorized!" });
          }
          let token = createToken(); // we make the token of this session
          let now = Date.now();
          // create session username for 1 tuntti (3600000 ms)
          // there's no user password here, but own token for website
          let session = {
            user: req.body.username,
            token: token,
            ttl: now + time_to_life_diff,
          };
          loggedSessions.push(session);
          return res.status(200).json({ token: token });
        }
      );
      return;
    }
  }
  return res.status(401).json({ message: "Unauthorized!" });
});

app.post("/logout", function (req, res) {
  if (!req.headers.token) {
    return res.status(404).json({ message: "not found" });
  }
  for (let i = 0; i < loggedSessions.length; i++) {
    if (req.headers.token === loggedSessions[i].token) {
      loggedSessions.splice(i, 1);
      return res.status(200).json({ message: "success" });
    }
  }
  return res.status(404).json({ message: "not found" });
});

//HELPERS
// '/api' will be used just after check isUserlogged and apiroutes
app.use("/api", isUserLogged, apiroutes);

app.listen(port);

console.log("Running on port ", port);
