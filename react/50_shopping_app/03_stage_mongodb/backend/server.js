const express = require("express");
const apiroutes = require("./routes/apiroutes");
//for changing a password to hash code
const bcrypt = require("bcrypt");
//for creationg token
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();

app.use(express.json());

const port = process.env.PORT || 3001;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;

const connection_url =
  "mongodb+srv://" +
  mongo_user +
  ":" +
  mongo_password +
  "@" +
  mongo_url +
  "/shoppingdatabase?retryWrites=true&w=majority";

mongoose.connect(connection_url).then(
  () => console.log("Successfully connected to Mongodb"),
  (error) => console.log("Failed to connect to Mongodb. Reason", error)
);

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
  sessionModel.findOne({ token: req.headers.token }, function (err, session) {
    if (err) {
      console.log("Error in finding session while if filter. Reason:", err);
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!session) {
      return res.status(403).json({ message: "Forbidden" });
    }
    let now = Date.now();
    if (now > session.ttl) {
      sessionModel.deleteOne({ _id: session_id }, function (err) {
        if (err) {
          console.log("Failed to remove expired session. Reason:", err);
        }
        return res.status(403).json({ message: "Forbidden" });
      });
    } else {
      req.session = {};
      req.session.user = session.user;
      session.ttl = now + time_to_life_diff;
      session.save(function (err) {
        if (err) {
          console.log("Failed to update session. Reason:", err);
        }
        return next();
      });
    }
  });
};

// LOGIN API
// here we register user and password and
// change a password to hash (numeroinen salasana)

app.post("/register", function (req, res) {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  if (req.body.username.length < 4 || req.body.password.length < 8) {
  }
  bcrypt.hash(req.body.password, 14, function (err, hash) {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    let user = new userModel({
      username: req.body.username,
      password: hash,
    });
    user.save(function (err, user) {
      if (err) {
        console.log("Failed to save new user. Reason:", err);
        if (err.code === 11000) {
          return res.status(409).json({ message: "Username already in use" });
        }
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(201).json({ message: "User registered!" });
    });
  });
});

//here tartkistetaan username ja salasana
//and make token for this session(username, token) of this particular user
app.post("/login", function (req, res) {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  if (req.body.username.length < 4 || req.body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Please provide proper credentials" });
  }
  userModel.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      console.log("Error in finding user in login. Reason:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    bcrypt.compare(req.body.password, user.password, function (err, success) {
      if (err) {
        console.log("Error when comparing passwords. Reason:", err);
      }
      if (!success) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = createToken();
      let now = Date.now();
      let session = new sessionModel({
        user: req.body.username,
        ttl: now + time_to_life_diff,
        token: token,
      });
      session.save(function (err) {
        if (err) {
          console.log("Failed to save session in login. Reason:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json({ token: token });
      });
    });
  });
});

app.post("/logout", function (req, res) {
  if (!req.headers.token) {
    return res.status(404).json({ message: "not found" });
  }
  sessionModel.deleteOne({ token: req.headers.token }, function (err) {
    if (err) {
      console.log("Failed to remove session. Reason:", err);
    }
    return res.status(200).json({ message: "success!" });
  });
});

//HELPERS
// '/api' will be used just after check isUserlogged and apiroutes
app.use("/api", isUserLogged, apiroutes);

app.listen(port);

console.log("Running on port ", port);
