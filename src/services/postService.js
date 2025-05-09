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

exports.fetchPosts = () => posts;

exports.createPost = (data) => {
  posts.push(data);
};
