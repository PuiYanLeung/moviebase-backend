require("dotenv").config();
const cors = require("cors");

const express = require("express");
const passport = require("passport");

const { registerStrategy, loginStrategy, verifyStrategy } = require("./auth");
const { connection } = require("./db");
const User = require("./models/user");
const Film = require("./models/film");
const WatchList = require("./models/watchlist");
const indexRouter = require("./routes/index");
const errorRouter = require("./routes/error");
const userRouter = require("./routes/user");
const filmRouter = require("./routes/film");
const watchlistRouter = require("./routes/watchlist");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: true }));
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/film", filmRouter);
app.use("/watchlist", watchlistRouter);
app.use("*", errorRouter); // Use error router here

app.listen(process.env.HTTP_PORT || 5000, async () => {
  connection.authenticate();
  await User.sync({alter: true}); // This creates/updates tables
  await Film.sync({alter: true}); // This creates/updates tables
  await WatchList.sync({alter: true}); // This creates/updates tables
  console.log("App is online");
});
