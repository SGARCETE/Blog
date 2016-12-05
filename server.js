//importamos el framework Express, Body-Parser y Multer
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var router = express.Router();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(router);

//Las entradas del blog, es un Json.
var entries = [
    { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
    { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
    { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
    { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

//Definimos el puerto que vamos a utilizar
app.listen(4000, function() {
    console.log("Node server running on http://localhost:3000");
});

//Obtener todos los posts
app.get('/posts', function(req, res) {
    res.json(entries);
});

//Obtenemos el ultimo post
app.get('/posts/new', function(req, res) {
    res.json(entries[entries.length-1])
});

//Agregamos una entrada nueva por medio de un post (usando postman).
app.get('/posts/:id', function(req, res) {
    if(entries.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }
    console.log(req.params.id)
    var e = entries[req.params.id];
    res.json(e);
});

app.post('/post', upload.array(), function (req, res, next){

    var newQuote = {
        author : req.body.author,
        text : req.body.text
    };

    entries.push(newQuote);
    res.json(true);
});

//Borramos un post
app.delete('/posts/:id', function(req, res) {
    if(entries.length <= req.params.id) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }

    entries.splice(req.params.id, 1);
    res.json(true);
});


