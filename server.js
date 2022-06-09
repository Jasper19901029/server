const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "001",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      accountBalance: 5000,
    },
    {
      id: "002",
      name: "Amy",
      email: "amy@gmail.com",
      password: "apple",
      accountBalance: 2000,
    },
    {
      id: "003",
      name: "Paul",
      email: "paul@gmail.com",
      password: "bananas",
      accountBalance: 3500,
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  let find;
  let user;
  database.users.find((e) => {
    if (e.email === req.body.email && e.password === req.body.password) {
      return (find = true), (user = e);
    }
  });
  if (find) {
    res.json(user);
  } else {
    res.status(400).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "004",
    name: name,
    email: email,
    password: password,
    accountBalance: 0,
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
