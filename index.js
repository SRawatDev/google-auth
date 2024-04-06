const express = require('express');
const passport = require('passport');
const router = require("./routing/router")
const session = require('express-session');
const path = require('path');
const app = express();
require('./auth');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

app.use(
    session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use ('/auth/logout', (req, res) => {
    req.session.destroy ();
    res.send ('See you again!');
  });
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router)

app.listen(5000, () => {
    console.log('Listening on port 5000');
});