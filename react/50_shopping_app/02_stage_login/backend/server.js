const express = require("express");
// using miniapp module (router as a module)
//loads a middleware function in it, defines some routes,
// and mounts the router module on a path in the main app.
const apiroutes = require("./routes/apiroutes");
//for changing a password to hash code
const bcrypt = require("bcrypt");
//for creationg token
const crypto = require("crypto");

let app = express();

app.use(express.json()); //built-in middleware

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
  return token.toString("hex"); //hexaluku 1..9A....F
};

// FILTER for DATABASE PASSING, check do you have key(token)

isUserLogged = (req, res, next) => {
  if (!req.headers.token) {
    return res
      .status(403)
      .json({ message: "Forbidden, there's no token in request!" });
  }
  for (let i = 0; i < loggedSessions.length; i++) {
    //
    // check is there a session with given token
    //
    if (req.headers.token === loggedSessions[i].token) {
      let now = Date.now();

      // check is session just time of session, which was put while login

      if (now > loggedSessions[i].ttl) {
        //ttl: see below
        // delete session if time is out, splice remove 1 element from []
        loggedSessions.splice(i, 1);
        return res
          .status(403)
          .json({ message: "Forbidden, time has been run out!" });
      }
      //start session for api/- requests from present time
      loggedSessions[i].ttl = now + time_to_life_diff;
      req.session = {}; // loudaan session into req object
      req.session.user = loggedSessions[i].user; // add session.user to req and give user name from loggedSession[]
      //change turn to next middleware apiroutes see below
      return next(); // return used to ensure that the execution stops after triggering the callback.
    }
  }
  return res
    .status(403)
    .json({ message: "Forbidden, this session is not registered!" });
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
  // Checks if a username and password have been created
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide proper credintials" });
  }
  // check that the user and password are long enough
  if (req.body.username.length < 4 || req.body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Please provide proper credintials" });
  }
  // whether the username was previously registered in registeredUsers[]
  for (let i = 0; i < registeredUsers.length; i++) {
    if (req.body.username === registeredUsers[i].username) {
      return res.status(409).json({ message: "Username already in use" });
    }
  }
  // changing a password to hash code
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
//and every time when user login we make token for this particular session(username, token) of this particular user
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
          // session for this user leaves on server and just token is sent back
          let session = {
            user: req.body.username,
            token: token,
            ttl: now + time_to_life_diff,
          };
          loggedSessions.push(session);
          //send to web-side the token as a ID of session
          //for diff. requests is used just token, no need password and username
          return res.status(200).json({ token: token }); //cause in session = is token:token
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
// when user wants to get from "/api", checking his req by calling esUserlogged(), if it ok 'return next()' => apiroutes.js
// just the username (req.session.user) passes to apiroutes
app.use("/api", isUserLogged, apiroutes);

app.listen(port);

console.log("Running on port ", port);
