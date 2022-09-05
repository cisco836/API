const cors = require('cors')
const express = require("express")
const app = express()
const pool = require('./Middleware/connection')
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const router = require('./Routes/shipmentIn')
const router2 = require('./Routes/shipmentOut')
const router3 = require('./Routes/decantingIn')


app.use('/route',router)
app.use('/route2',router2)
app.use('/route3',router3)
app.get('/',(req,res)=>{
   
})

app.listen(3001,()=>console.log("SERVER LISTENING AT 3000"))