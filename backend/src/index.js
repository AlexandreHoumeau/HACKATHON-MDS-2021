import express from "express";
import routes from "./api/routes/index";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
const app = express();
const PORT = 5000;

app.use(cors())
mongoose.connect(
  "mongodb://localhost:27017/project",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  },
  () => {
    console.log("Connect to database");
  }
);

app.listen(PORT, () => {
  console.log("Listening on port 5000");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);
