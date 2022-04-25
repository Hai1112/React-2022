const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const artifactRoute = require("./routes/artifact");
const weaponRoute = require("./routes/weapon");
const characterRoute = require("./routes/character");
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use("/api/artifacts", artifactRoute);
app.use("/api/weapons", weaponRoute);
app.use("/api/characters", characterRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
