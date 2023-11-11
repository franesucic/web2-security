const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");
const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: "https://web2-security-client.onrender.com",
    methods: ["GET", "POST"]
}));
app.use(express.json());

app.get("/sqlon/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const query = `SELECT * FROM users WHERE username = '${username}' and password = '${password}'`;
    const result = await pool.query(query);
    res.json(result.rows);
    /*res.header({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin"
    });*/
})

app.get("/sqloff/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    res.json(result.rows);
    /*res.header({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin"
    });*/
})

app.get("/csrfoff/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const tempResult = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    const token = username + password + new Date().toISOString();
    const hash = crypto.createHash("sha256");
    const hashedToken = hash.update(token).digest("hex");
    const result = await pool.query('UPDATE users SET token = $1 where username = $2', [hashedToken, username]);
    res.json(tempResult.rows);
})

app.get("/csrfon/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const r = await pool.query('UPDATE users SET token = $1 where username = $2', [undefined, username]);
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    res.json(result.rows);
})

app.get("/changePassword/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const result = await pool.query('UPDATE users SET password = $1 WHERE username = $2', [password, username]);
    res.json(result.rows);
})

app.get("/secureChangePassword/:username/:password/:token", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    let token = req.params.token;
    const tokenResult = await pool.query('SELECT * from users where username = $1', [username]);
    if (tokenResult.rows[0].token === token) {
        const result = await pool.query('UPDATE users SET password = $1 WHERE username = $2', [password, username]);
        res.json(result.rows);
        res.send("Done");
    } else {
        res.send("Failed");
    }
})

app.get("/getToken/:username/:password", async (req, res) => {
    let username = req.params.username;
    let password = req.params.password;
    const tokenResult = await pool.query('SELECT * from users where username = $1', [username]);
    res.json(tokenResult.rows);
})

app.listen(3000, () => {
    console.log("Server has started on port 3000.");
})