const express = require("express");
const routes = require("./routes");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const { dbConnectionUrl } = require("./utils");

const autoseed = require("./seed/auto");

console.log("dbConnectionUrl", dbConnectionUrl);
mongoose
  .connect(dbConnectionUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB!");
    autoseed();
  })
  .catch((error) => {
    console.error("An error occurred while connecting to DB: ", error);
  });

const app = express();

app.use(helmet());
app.use(compression()); //Compress all routes

app.use(cors());

app.use(express.json()); //parses incoming requests as JSON
app.use("/", routes);

app
  .listen(5000, () =>
    console.log("Server up and running at: http://localhost:5000")
  )
  .on("error", (error) =>
    console.error("An error occurred on server: ", error)
  );
