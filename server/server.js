import express from "express"
import cors from "cors"

const PORT = '2222'
import Database from "better-sqlite3"

const db = new Database('database.db')

const app = express()
app.use(express.json())

// ROOT ROUTE
// app.get('/', (req, res) => {

    //send a string back
    // res.send("OoooooOOOhhhh!")

    //send .json back
    // res.json({spooked: true})

    // 200 OK
    // res.status(200)
// })


// get -> Select statement (if GET)
// post -> Select statement (if POST)
// http://localhost:222/movies?id=1 (it gives movie with id:1)

app.get('/movies', (req, res) => {
    try {
        // console.log(req.query.id)

        // find a record bu it's id
        if (req.query.id) {
            // res.status(200).send('Cool you send a query!')
            let movie = db.prepare(`SELECT * FROM movies WHERE id = ?`).all(req.query.id)
            res.status(200).json(movie)
            return
        }

        // add some new movies to your db using your seed js - smoe movies of the same year
        // try to fetch all movies from a certain year
        let movies = db.prepare(`SELECT * FROM movies`).all()

        res.status(200).json(movies)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Server listening
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})