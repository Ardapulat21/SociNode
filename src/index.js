const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const connectDB = require("./config/db");

const messageService = require("./services/messageService");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");

const verifyToken = require("./middleware/authMiddleware");

const PORT = 3001;
const FRONTPORT = 5174;

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRoutes);
app.use("/api/post", verifyToken, postRoutes);
app.use("/api/message", verifyToken, messageRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const io = new Server(server, {
  cors: {
    origin: `http://144.91.99.115:${FRONTPORT}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    const messageInfo = JSON.parse(data);
    messageService.saveMessage(messageInfo);
    io.to(messageInfo.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
