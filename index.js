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

app.get("/", (req, res) => {
  res.send("Welcome to MyFlix");
});

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

//Add a user
/* We'll expect JSON in this format
{
   ID: Integer,
   Username: String,
   Password: String,
   Email: String,
   Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Get all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error: " + err + "it works");
    });
});

//Get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/

app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete("/users/:RemoveMovie", (req, res) => {
  res.send(`Successful DELETE request to remove a user's movie`);
});

// Delete a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.listen(5500, () => console.log("The server is up and running"));
