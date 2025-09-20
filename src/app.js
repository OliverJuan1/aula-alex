import express from 'express'
import mysql from 'mysql2/promise'
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'apinode'
})
const app = express();
app.get("/", (req, res) => {
    res.send("Olá Mundo");
});
app.get("/usuario", async (req, res) => {
    const [results] = await pool.query(
        'SELECT * FROM usuario',
    );
        res.json(results);
})
app.get("/usuario/:id", async (req, res) => {
    const { id } = req.params;
    const [results] = await pool.query(
        'SELECT * FROM usuario WHERE id = ?', id
    );
        res.json(results);
})



app.listen(3000, () => {
    console.log(`Servidor rodando na porta: 3000`);
})