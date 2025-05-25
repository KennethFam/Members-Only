if (process.env.NODE_ENV !== "PROD") require("dotenv").config();
const session = require("express-session");

module.exports = session({ 
    store: new (require(`connect-pg-simple`)(session))({
        conString: process.env.DATABASE_URL, // connection string for the db
        createTableIfMissing: true // create session db if it does not exist
    }),
    secret: process.env.SESSION_SECRET, // set secret
    resave: false, // session is only saved if it was modified, affects existing sessions
    saveUninitialized: false, // only save session if you modify it, affects new sessions
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});
