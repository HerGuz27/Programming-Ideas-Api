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
    host : 'localhost',
    database : 'ProgramIdeas',
    user : 'ostechnix',
    password : 'Password123#@!',
});


conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

conexion.query('SELECT * FROM ideas', function (error, results, fields) {
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

