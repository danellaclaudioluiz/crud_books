import express from "express";
import mysql from "mysql";
const app = express();
import cors from "cors";

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// pra utilizar json no body
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello, this is the home")
})

app.get("/books/:id", (req, res) => {
    const q = "SELECT * FROM books WHERE id = ?";
    const bookId = req.params.id;

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.post("/books", (req, res) => {
    
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has created successfully.");
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;

    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(`Book id: ${bookId} has deleted successfully.`);
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    console.log(values);
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(`Book id: ${bookId} has updated successfully.`);
    })
})

app.listen(process.env.PORT, () => {
    console.log('connected to backend');
})