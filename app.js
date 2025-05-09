const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
var bodyParser = require("body-parser");
var formidable = require("formidable");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/getposts", (req, res) => {
  res.json(posts);
});

app.post("/api/addpost", (req, res) => {
  const form = new formidable({ multiples: true });
  form.parse(req, (error, fields, files) => {
    if (error) {
      console.log("err");
      return;
    }
    console.log(fields);
    console.log(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const user = {
  id: 1,
  name: "Arda",
  surname: "Pulat",
  avatarUrl: "Arda Pulat.jpeg",
};
const posts = [
  {
    id: 1,
    user: user,
    description: "Hey",
    imgUrl: "hapinnes.png",
    likes: [
      {
        id: 1,
        name: "Arda",
        surname: "Pulat",
        avatarUrl: "Arda Pulat.jpeg",
      },
      {
        id: 1,
        name: "Arda",
        surname: "Pulat",
        avatarUrl: "Arda Pulat.jpeg",
      },
      {
        id: 1,
        name: "Arda",
        surname: "Pulat",
        avatarUrl: "Arda Pulat.jpeg",
      },
    ],
    comments: [
      {
        id: 1,
        user: user,
        comment: "hey its comment",
      },
      {
        id: 1,
        user: user,
        comment: "hey its comment",
      },
      {
        id: 1,
        user: user,
        comment: "hey its comment",
      },
    ],
    date: new Date("10/02/2024"),
  },
  {
    id: 1,
    user: user,
    description: "Hey",
    imgUrl: "hapinnes.png",
    likes: [
      {
        id: 1,
        name: "Arda",
        surname: "Pulat",
        avatarUrl: "Arda Pulat.jpeg",
      },
      {
        id: 1,
        name: "Arda",
        surname: "Pulat",
        avatarUrl: "Arda Pulat.jpeg",
      },
      {
        id: 1,
        name: "Arda",
        surname: "Pulat",
        avatarUrl: "Arda Pulat.jpeg",
      },
    ],
    comments: [
      {
        id: 1,
        user: user,
        comment: "hey its comment",
      },
      {
        id: 1,
        user: user,
        comment: "hey its comment",
      },
      {
        id: 1,
        user: user,
        comment: "hey its comment",
      },
    ],
    date: new Date("10/02/2024"),
  },
];
