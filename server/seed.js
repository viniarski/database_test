import Database from "better-sqlite3";

// idea behind seed file is to 'seed' our database with some initial data

// hook up our database.db to get methods
const db = new Database('database.db')

// .exec executes some sql query
// USE backticks ``
// inside the ()'s put columns that we want
db.exec(`CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie TEXT,
    year INTEGER
) `)

// PRIMARY KEY - flaging our id as a records unique identifer
// AUTOINCREMENT - starts at 1, and add one to each new record after that
// inserts must be single quotes ''

db.exec(`
    INSERT into movies (movie, year)
    VALUES
    ('Pulp Fiction', 1994),
    ('Lock, Stock and Two Smoking Barrels', 2000),
    ('Snatch', 2001)
`)

// control d (to exit sqlite in terminal)