if (process.env.NODE_ENV !=="PROD") require("dotenv").config();

const path = require("node:path");
const express = require("express");
const passport = require("passport");
const sessionConfig = require("./config/session");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(sessionConfig);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const signUpRouter = require("./routes/signUp");

app.use("/sign-up", signUpRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));

