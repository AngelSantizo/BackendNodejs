//crearemos nuestra ruta
var express = require('express');
var router = express.Router();

//necesitaremos donde llevar un lugar de memoria para las tareas
let tasks = [];

//accion para obtener todos los tasks
router.get('/getTasks', function(req, res, next){
    //se guardaran JSON dentro del array
    res.json(tasks);
}) //req, parametros para pedir la peicion, res hace referencia a la respuesta  y un next en dado caso usaremos un middleware

module.exports = router;