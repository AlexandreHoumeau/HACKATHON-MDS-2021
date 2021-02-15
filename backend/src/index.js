import express from "express";
import routes from "./api/routes/index";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

mongoose.connect(
  "mongodb://localhost:27017/project",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  },
  () => {
    console.log("Connect to database");
  }
);
require('./api/models/Post')
require('./api/models/User')
require('./api/models/PhotoPost')

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);
