//crearemos nuestra ruta
var express = require('express');
var router = express.Router();

//traemos la base de datos
const mongoose = require('mongoose');
const { response } = require('../app');

//inicializaremos la tabla de tasks
const taskInit = mongoose.model('tasks',{
    name:String,
    description: String,
    dueDate: String
}, 'tasks');

//necesitaremos donde llevar un lugar de memoria para las tareas
let tasks = [{
    //agregaremos uno de default como prueba
    id:"1",
    name: "Backend",
    description: "Prueba de backend",
    dueDate:"10-5-2024"
}];

//accion para obtener todos los tasks
router.get('/getTasks', function(req, res, next){

    //hacemos la consulta en la base de datos
    taskInit.find({}).then((repsonse)=>res.status(200).json(response).catch((err)=>{res.status(500).json(err)}));
}) //req, parametros para pedir la peicion, res hace referencia a la respuesta  y un next en dado caso usaremos un middleware

router.post('/addTasks', function(req, res, next){
    //tenemos que verificar cada tarea por un ID
    let timeStamp = Date.now() + Math.random();

    //verificaremos aquí si existe el html comprobando body
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        //aqui agregamos el ID 
        req.body.id = timeStamp.toString();
        tasks.push(req.body);

        //agregamos funcionalidad de la base de datos
        const task = new taskInit(req.body);
        task.save().then(()=>{
            res.status(200).json(tasks);
        }).catch((err)=>res.status(500).json({}))
    } else {
        //en caso que no cumpla con los 3 parametros de name,des y due date entonces se enviara este error de bad request
        res.status(400).json({});
    }
});

router.delete('/removeTask/:id', function(req, res, next){
    //verificamos los parametros 
    if(req.params && req.params.id){
        //hacemos la funcion de delete
        let id = req.params.id;
        taskInit.deleteOne({_id: new mongoose.Types.ObjectId(id)})
        .then((response)=>{
            res.status(200).json(200);
        }).catch((err)=>{
            res.status(400).json({});
        })
    }else{
        //si no se cumple con los parametros entonces tambien mandaremos un bad request
        res.status(400).json({});
    }
});

module.exports = router;