const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
