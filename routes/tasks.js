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

router.post('/addTasks', function(req, res, next){
    //tenemos que verificar cada tarea por un ID
    let timeStamp = Date.now() + Math.random();

    //verificaremos aquí si existe el html comprobando body
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        //aqui agregamos el ID 
        req.body.id = timeStamp;
        tasks.push(req.body);
        res.json(tasks);
    } else {
        res.status(400).send("Faltan datos obligatorios para crear la tarea.");
    }
});

module.exports = router;