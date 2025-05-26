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

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const newMessageRouter = require("./routes/new-message");
const promotionRouter = require("./routes/promotion");
const deleteMsgRouter = require("./routes/delete");

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/new-message", newMessageRouter);
app.use("/promotion", promotionRouter);
app.use("/delete", deleteMsgRouter);


app.listen(3000, () => console.log("app listening on port 3000!"));

