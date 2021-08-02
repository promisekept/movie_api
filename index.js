const express = require("express"),
  morgan = require("morgan");
const app = express();

app.use(express.static("public"));
app.use(morgan("common"));

const top10 = [
  { title: "Old" },
  { title: "Space Jam" },
  { title: "Snake Eyes" },
  { title: "Black Widow" },
  { title: "Pig" },
  { title: "Dead pigs" },
  { title: "Gunpowder Milkshake" },
  { title: "Blood Red Sky" },
  { title: "The Tomorrow War" },
  { title: "Fear Street Part One: 1994" },
];

app.get("/movies", (req, res) => {
  res.json(top10);
});

app.get("/", (req, res) => {
  res.send("This is my default page");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(2021, () => {
  console.log("Your app is listening on port 2021");
});
