const express = require("express");
const app = express();
const cors = require("cors");
//const pool = require("./db.js");

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
    res.send("Server active.");
})
/*
app.get("/sqlon/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const query = `SELECT * FROM users WHERE username = '${username}' and password = '${password}'`;
    const result = await pool.query(query);
    res.json(result.rows);
})

app.get("/sqloff/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    res.json(result.rows);
})

app.listen(3000, () => {
    console.log("Server has started on port 3000.");
})*/