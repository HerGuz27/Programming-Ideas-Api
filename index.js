const express= require('express')
const bodyParser= require('body-parser')
const cors= require('cors')
const app=express()
const port=process.env.PORT||3000


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hola Mundo")
})
app.get("/datos",(req,res)=>{
const mysql = require('mysql2');
const conexion= mysql.createConnection({
    host : 'ec2-3-211-228-251.compute-1.amazonaws.com',
    database : 'dcrvpthkpb2k2e',
    user : 'nzbzmmeptypctl',
    port:'5432',    
    password : '8d56c291bff0e6794687455c2c2e4a8ae219cb2a77fa0b5229764fec7aca4c6a',
});


conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.query('SELECT * FROM Persons', function (error, results, fields) {
     if(error) {
      res.status = 422
      res.json(error)
      return // without this return the error can happen.
    }
    return res.json(results)
  })

conexion.end();
})
app.listen(port,()=>
console.log('Example app listening at http://localhost:'+port)
)
