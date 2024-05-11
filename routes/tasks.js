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
        req.body.id = timeStamp.toString();
        tasks.push(req.body);
        res.json(tasks);
    } else {
        //en caso que no cumpla con los 3 parametros de name,des y due date entonces se enviara este error de bad request
        res.status(400).json({});
    }
});

router.delete('/removeTask/:id', function(req, res, next){
    //verificamos los parametros 
    if(req.params && req.params.id){
        let id = req.params.id;

        //eliminaremos aqui 
        tasks = tasks.filter(task => task.id !== id); //recorrera el arreglo, lo filtrara cada uno y que coincida con el id sera el que se borrara
        res.json(tasks);
    }else{
        //si no se cumple con los parametros entonces tambien mandaremos un bad request
        res.status(400).json({});
    }
});

module.exports = router;