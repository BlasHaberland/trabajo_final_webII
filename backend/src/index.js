const express = require('express');
const cors = require('cors');
const { inicializarBaseDatos, inicializarConexion } = require('./data-base/conecction');
require('dotenv').config();

const app = express();

// Middleware globales para todas las rutas
app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// Rutas    
app.post('/players', [], async function (req, res) {
    const nombre = req.body.name;
    const puntos = req.body.points;
    const segundos = req.body.seconds;
    const correctas = req.body.correctsAnswer

    try {
        const connection = await inicializarConexion();
        await connection.query(`INSERT INTO players(name, points, seconds, correctsAnswer) VALUES (?, ?, ?, ?)`, [nombre, puntos, segundos, correctas]);/*name, points, seconds, corrects) */ 
        res.json({ respuesta: "puntaje creado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/players', [], async function (req, res){
    const connection = await inicializarConexion();
    const jugadores = await connection.query("SELECT name, points, seconds, correctsAnswer FROM players ORDER BY points DESC, correctsAnswer ASC, seconds ASC LIMIT 20")/*SELECT name, points, seconds, corrects*/ 
        
    res.json({jugadores: jugadores[0]});

})



app.listen(process.env.PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    await inicializarBaseDatos();
});

