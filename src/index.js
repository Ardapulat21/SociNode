const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const user = require("./models/user");
const userAuth = require("./models/userAuth");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = 3000;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
