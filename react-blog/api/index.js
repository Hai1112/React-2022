const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const photoCoverRoute = require("./routes/photoCover");
const aboutRoute = require("./routes/about");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connect successfully..."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/cover", photoCoverRoute);
app.use("/api/about", aboutRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Backend server is running...")
);
