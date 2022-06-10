const express = require("express");
const routes = require("./routes/index");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const app = express();

app.use(helmet());
app.use(compression()); //Compress all routes

app.use(cors());

app.use(express.json()); //parses incoming requests as JSON
app.use("/", routes);

app.listen(process.env.PORT || 3000);
