//crearemos nuestra ruta para la meta
var express = require('express');
var router = express.Router();

//traemos la base de datos
const mongoose = require('mongoose');
const { response } = require('../app');

const goalsInit = mongoose.model('goals',{
    name:String,
    description: String,
    dueDate: String
}, 'goals');

//necesitaremos donde llevar un lugar de memoria para las metas
let goals = [];

//accion para obtener todos las metas
router.get('/getGoals', function(req, res, next){
    //hacemos la consulta en la base de datos
    goalsInit.find({}).then((repsonse)=>res.status(200).json(response).catch((err)=>{res.status(500).json(err)}));
}) 

router.post('/addGoals', function(req, res, next){
    //ID
    let timeStamp = Date.now() + Math.random();

    //verificaremos aquí si existe el html comprobando body
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        //aqui agregamos el ID 
        req.body.id = timeStamp.toString();
        goals.push(req.body);
        
        //agregamos los goals a la base de datos 
        //agregamos funcionalidad de la base de datos
        const goals = new goalsInit(req.body);
        task.save().then(()=>{
            res.status(200).json(tasks);
        }).catch((err)=>res.status(500).json({}))

    } else {
        res.status(400).send("Faltan datos obligatorios para crear la tarea.");
    }
});

router.delete('/removeGoals/:id', function(req, res, next){
    //verificamos los parametros 
    if(req.params && req.params.id){
        //hacemos la funcion de delete
        let id = req.params.id;
        goalsInit.deleteOne({_id: new mongoose.Types.ObjectId(id)})
        .then((response)=>{
            res.status(200).json(200);
        }).catch((err)=>{
            res.status(400).json({});
        })
    }else{
        res.status(400).send("Faltan datos obligatorios para crear la tarea.");
    }
});

module.exports = router;