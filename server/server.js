import express from "express";
import cors from "cors";

const PORT = "2222";
import Database from "better-sqlite3";

const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors())

// http://localhost:222/movies?id=1 (movie with id:1)

// GET

app.get("/movies", (req, res) => {
  try {
    // console.log(req.query.id)

    // find a record by it's id
    if (req.query.id) {
      let movie = db
        .prepare(`SELECT * FROM movies WHERE id = ?`)
        .all(req.query.id);
      res.status(200).json(movie);
      return;
    }

    let movies = db.prepare(`SELECT * FROM movies`).all();

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create new movie entries in our Database

app.post("/movies", (req, res) => {
  try {
    const movie = req.body.movie;
    const year = req.body.year;
    //run my sql statement
    const newMovie = db
      .prepare(`INSERT INTO movies (movie, year) VALUES (?,?)`)
      .run(movie, year);
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

