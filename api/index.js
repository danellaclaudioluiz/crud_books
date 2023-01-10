import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "test",
})

app.get("/", (req, res) => {
    res.json("hello, this is the home")
})

app.listen(8800, () => {
    console.log('connected to backend');
})