//crearemos nuestra ruta para la meta
var express = require('express');
var router = express.Router();

//necesitaremos donde llevar un lugar de memoria para las metas
let goals = [];

//accion para obtener todos las metas
router.get('/getGoals', function(req, res, next){
    //se guardaran JSON dentro del array
    res.json(goals);
}) 

router.post('/addGoals', function(req, res, next){
    //ID
    let timeStamp = Date.now() + Math.random();

    //verificaremos aquí si existe el html comprobando body
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        //aqui agregamos el ID 
        req.body.id = timeStamp.toString();
        goals.push(req.body);
        res.json(goals);
    } else {
        res.status(400).send("Faltan datos obligatorios para crear la tarea.");
    }
});

router.delete('/removeGoals/:id', function(req, res, next){
    //verificamos los parametros 
    if(req.params && req.params.id){
        let id = req.params.id;

        //eliminaremos aqui 
        goals = goals.filter(goals => goals.id !== id); //recorrera el arreglo, lo filtrara cada uno y que coincida con el id sera el que se borrara
        res.json(goals);
    }else{
        res.status(400).send("Faltan datos obligatorios para crear la tarea.");
    }
});

module.exports = router;