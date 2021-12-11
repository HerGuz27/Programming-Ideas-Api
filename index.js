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
    const { Client } = require('pg')
    const connectionData = {
        user: 'nzbzmmeptypctl',
        host: 'ec2-3-211-228-251.compute-1.amazonaws.com',
        database: 'dcrvpthkpb2k2e',
        password: '8d56c291bff0e6794687455c2c2e4a8ae219cb2a77fa0b5229764fec7aca4c6a',
        port: 5432,
        ssl:{
            rejectUnauthorized:false,
        },
      }
      const conexion=new Client(connectionData)
conexion.connect()
conexion.query('SELECT * FROM Persons')
    .then(response => {
        console.log(response.rows)
        return res.json(response.rows)
        
    })
    .catch(err => {
        conexion.end()
    })
})

app.listen(port,()=>
console.log('Example app listening at http://localhost:'+port)
)
