const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const verifyToken = require("./middleware/authMiddleware");

const app = express();
const PORT = 3000;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRoutes);
app.use("/api/post", verifyToken, postRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
