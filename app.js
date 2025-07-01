if (process.env.NODE_ENV !=="PROD") require("dotenv").config();

const path = require("node:path");
const express = require("express");
const passport = require("passport");
const sessionConfig = require("./config/session");
const methodOverride = require('method-override');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(sessionConfig);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const MessageRouter = require("./routes/message");
const promotionRouter = require("./routes/promotion");

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/message", MessageRouter);
app.use("/promotion", promotionRouter);

// error 404 handler
app.use((req, res) => { res.status(404).send("Error 404. Page not found.") });
// error handler
app.use((err, req, res, next) => { res.status(500).send("Server error. Please try again.") });

app.listen(3000, () => console.log("app listening on port 3000!"));

