const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");

//Definisco il cors
// app.use(cors({
// 	origin: 'http://localhost:5173'
// }));

// Registro il body-parser per "application/json"
app.use(express.json());

// Importo il file del routing
const postsRouter = require('./routers/posts');

// Importo il middleware dell'errore 500
const errorsHandler = require("./middlewares/errorsHandler");

// Importo il middleware dell'errore 404
const notFound = require("./middlewares/notFound");

// Definisco una cartella per i file statici
app.use(express.static('public'));

// Definisco la rotta home
app.get('/', (req, res) => {
	res.send('Server del mio blog')
})

// Utilizzo la rotta posts per definire la parte iniziale delle rotte
app.use('/posts', postsRouter)

// utilizzo middleware di gestione errore server 500
app.use(errorsHandler);

// Utilizzo middleware errore 404
app.use(notFound);

// Avvio server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
