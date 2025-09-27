import express from 'express'
import mysql from 'mysql2/promise'
const pool = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'api_node'
})
const app = express();
app.use(express.json())

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
        'SELECT * FROM usuario WHERE id_usuario = ?', id
    );
    res.json(results);
})



app.post("/usuarios", async (req, res) => {
    try {
        const { body } = req

        const [results] = await pool.query(
            "INSERT INTO usuario (nome, idade) VALUES (?,?)",
            [body.nome, body.idade]
        );

        const [usuarioCriado] = await pool.query(
            "Select * from usuario WHERE id_usuario= ?",
            results.insertId
        )

        res.status(201).json(results)
    } catch (error) {
        console.log(error)
    }
})



app.delete("usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await pool.query(
            "DELETE FROM usuario WHERE id_usuario=?", id
        )
        res.status(200).send("Usuario deletado!", results.insertId)
    } catch (error) {
        console.log(error)
    }
})

app.put ("/usuarios/:id", async(req, res)=>{
    try {
         const { id } = req.params;
         const {body} = req

         const [results] = await pool.query(
            "UPDATE usuario SET `nome` = ?, `idade`  = ? WHERE id_usuario = ?;",
             [body.nome, body.idade, id]
         )
         res.status(200).send("Usuario atualizado", results)
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log(`Servidor rodando na porta: 3000`);
})