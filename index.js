const mongoose = require("mongoose");
const Models = require("./models.js");
const bodyParser = require("body-parser");

const Movies = Models.Movie;
const Users = Models.User;

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movies = [
  {
    title: "Gunpowder Milkshake",
    description: "",
    genre: "action",
    director: "Navot Papushado",
    imageURL: "",
    featured: true,
  },
  {
    title: "Blood Red Sky",
    description: "",
    genre: "comedy",
    director: "Director 2",
    imageURL: "",
    featured: false,
  },
  {
    title: "Jungle Cruise",
    description: "",
    genre: "horror",
    director: "Director 3",
    imageURL: "",
    featured: true,
  },
  {
    title: "Jolt",
    description: "",
    genre: "thriller",
    director: "Director 4",
    imageURL: "",
    featured: false,
  },
  {
    title: "Dune",
    description: "",
    genre: "romance",
    director: "Director 5",
    imageURL: "",
    featured: true,
  },
];

app.get("/movies", (req, res) => {
  res.json(movies);
  // res.send("Successful GET request, returning data on all the movies");
});

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

app.get("/genres/:NameOrTitle", (req, res) => {
  res.send(`Here's the name or title: ${req.params.NameOrTitle}`);
});

app.get("/directors/:Name", (req, res) => {
  res.send(`Here's the director's name: ${req.params.Name}`);
});

app.post("/users", (req, res) => {
  res.send(`Successful POST request to register a a new user`);
});

app.put("/users/:Username", (req, res) => {
  res.send(`Successful PUT request to update user info`);
});

app.post("/users/:user/favorites/:Movie", (req, res) => {
  res.send(
    `Successful POST request to add a movie to a user's list of favorites`
  );
});

app.delete("/users/:RemoveMovie", (req, res) => {
  res.send(`Successful DELETE request to remove a user's movie`);
});

app.delete("/users:Username", (req, res) => {
  res.send(`Successful DELETE request to remove a user`);
});
app.listen(5500, () => console.log("The server is up and running"));
