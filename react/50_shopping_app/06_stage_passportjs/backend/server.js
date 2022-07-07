const express = require("express");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo");

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

mongoose.set("toJSON", { virtuals: true });

let time_to_life_diff = 3600000;

app.use(
  session({
    name: "fsumshopping-session",
    resave: true,
    secret: "MyBestSecret",
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://" +
        mongo_user +
        ":" +
        mongo_password +
        "@" +
        mongo_url +
        "/shoppingdatabase?retryWrites=true&w=majority",
      collectionName: "sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local-login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      if (!req.body) {
        return done(null, false, { message: "Bad Request" });
      }
      if (!req.body.username || !req.body.password) {
        return done(null, false, { message: "Bad Request" });
      }
      if (req.body.username.length < 4 || req.body.password.length < 8) {
        return done(null, false, { message: "Bad Request" });
      }
      userModel.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          console.log("Error in finding user in login. Reason:", err);
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Unauthorized" });
        }
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, success) {
            if (err) {
              console.log("Error when comparing passwords. Reason:", err);
              return done(err);
            }
            if (!success) {
              return done(null, false, { message: "Unauthorized" });
            }
            const token = createToken();
            let now = Date.now();
            req.temp = {};
            req.temp.token = token;
            req.temp.ttl = now + time_to_life_diff;
            req.temp.user = username;
            return done(null, user);
          }
        );
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serializeuser");
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  console.log("deserializeuser");
  userModel.findById(_id, function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

//HELPERS AND MIDDLEWARE

createToken = () => {
  let token = crypto.randomBytes(128);
  return token.toString("hex");
};

isUserLogged = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).json({ message: "Forbidden!" });
  }
  if (req.isAuthenticated()) {
    if (req.headers.token === req.session.token) {
      let now = Date.now();
      if (now > req.session.ttl) {
        req.session.destroy();
        req.logout();
        return res.status(403).json({ message: "Forbidden" });
      }
      req.session.ttl = now + time_to_life_diff;
      return next();
    }
  }
  return res.status(403).json({ message: "Forbidden" });
};

//LOGIN API

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

app.post(
  "/login",
  passport.authenticate("local-login", { failureRedirect: "/" }),
  function (req, res) {
    req.session.user = req.temp.user;
    req.session.ttl = req.temp.ttl;
    req.session.token = req.temp.token;
    return res.status(200).json({ token: req.session.token });
  }
);

app.post("/logout", function (req, res) {
  if (!req.headers.token) {
    return res.status(404).json({ message: "not found" });
  }
  if (req.session) {
    req.logout();
    req.session.destroy();
    return res.status(200).json({ message: "logged out" });
  }
  return res.status(404).json({ message: "not found" });
});

app.use("/api", isUserLogged, apiroutes);

app.listen(port);

console.log("Running in port ", port);
