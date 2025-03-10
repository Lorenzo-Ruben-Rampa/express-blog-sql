// // Import dei dati
// const menu = require('../data/posts');
// // const { post } = require('../routers/posts');

// // Import dei dati
const connection = require('../data/db');

//Es react api INIZIO
const express = require('express');
const app = express();
// importiamo il middleware di CORS
const cors = require('cors');
const port = 3000;
const postsRouter = require("../routers/posts");
//Es react api FINE

// // middleware per il CORS
// app.use(cors({
//     origin: 'http://localhost:5173'
// }));

// Funzioni con logica relativa alla rotta dei post
function index(req, res) {
    // Creo query 
    const sql = 'SELECT * FROM posts'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // query richiamo singolo post tramite ID
    const sql = 'SELECT * FROM posts WHERE id = ?';

    //chiamata tramite mysql a posts db
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });
}

function destroy(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    //Eliminiamo un post dal menu
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}

function store(req, res) {
    // console.log(req.body);
    // res.send(`Creazione nuovo post`);
    // Creo un nuovo id e ritorno l'ultimo elemento id di menu +1
    const newId = menu[menu.length - 1].id + 1;
    // Creo un nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // Aggiungo il nuovo post al menu
    menu.push(newPost);
    console.log(menu);

    // Restituisco lo status 201 e il nuovo post creato
    res.status(201);
    res.json(newPost);
}

function update(req, res) {
    // res.send(`Modifica integrale del post` + req.params.id)

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)
    // cerchiamo il post per id
    const post = menu.find(post => post.id === id);
    // Condizione if
    if (!post) {

        // ritorno lo stato di errore 404, non trovato
        res.status(404);

        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }
    // modifico i dati del post invididuato
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // Stampo in console il menu per un check
    console.log(menu);

    // Ritorno l'oggetto modificato
    res.json(post);
}

function modify(req, res) {
    // res.send(`Modifica parziale del post n° ` + req.params.id);
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)
    // cerchiamo il post per id
    const post = menu.find(post => post.id === id);
    // Condizione if
    if (!post) {

        // ritorno lo stato di errore 404, non trovato
        res.status(404);

        // ritorno un messaggio di errore (formato json)
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    // condizione if
    // if (req.body.title) {
    //     post.title = req.body.title;
    // } else {
    //     post.title = post.title;
    // }

    //operatore ternario
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.content ? post.content = req.body.content : post.content = post.content;


    // stampiamo in console il menu
    console.log(menu);

    // ritorniamo l'oggetto modificato
    res.json(post);
}

// esporto
module.exports = { index, show, store, update, modify, destroy };