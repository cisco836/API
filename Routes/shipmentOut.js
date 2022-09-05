const express = require("express")
const router = express.Router()
const pool = require('../Middleware/connection')
const bodyParser = require("body-parser")
const litAt60 = require('../Calculations/Litresat60')
const Volumeat85 = require('../Calculations/Volumeat85')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

//Middleware for getting data from database for post request


router.get('/shipmentOut',jsonParser,(req,res)=>{
    pool.query('SELECT * FROM shipmentOut',(err,data)=>{
        if(err){
            throw err
        }
        res.send(data)
    })
})

queryPromise_extract = (tNum)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`select quantity,tareWeight, timeIn from shipmentIn where tokenNumber="${tNum}"`,(error,results)=>{
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

queryPromise_insert = (data, req)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`insert into shipmentOut values(null,${req.body.tokenNumber},${req.body.dateIn},"${data.timeIn}",${req.body.tareWeight},${req.body.filledDate},"${req.body.arrivalAtGantry}",${req.body.temperature},${req.body.density}, ${req.body.grossWeight},${data.netWeight},${data.WBD},${data.diff},${req.body.invoiceDate},${req.body.dateOut},"${req.body.timeOut}",${req.body.pointNumber},"${req.body.filledBy}","${req.body.checkedBy}","${req.body.sealedBy}",${req.body.tankNum},${data.litres},${data.volumeat85},timediff(ArrivalAtGantry,"${data.timeIn}"),timediff(timeFilled,arrivalAtGantry),timediff(TimeOut,timeFilled),timediff(timeOut,"${data.timeIn}"),null)`,(err,results)=>{
                        if(err){
                            return reject(err)
                        }
                        return resolve(results)
                    })
    })
}

//deletion end point
queryPromise_delete = (data, req)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`delete from shipmentOut where serialNumber = ${data.body.serialNumber}`,(err,results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

//edit end point
queryPromise_edit = (data,req)=>{
    if(Object.keys(req.body).length===0){
        res.send("No values to edit!")
    }
    let sql = `UPDATE shipmentin SET `;
    Object.entries(req.body).forEach(([key,value])=>{
        const valueToSet = typeof req.body[key] === 'string' ? `'${value}'` : value;
        sql+= ` ${key}=${valueToSet}, `
    })
    sql = sql.slice(0,-2);
    sql+=` WHERE serialNumber=${req.body.serialNumber};`;
    console.log(sql)
    return new Promise((resolve,reject)=>{
        pool.query(sql,(err,results)=>{
            if(err){
                console.error(err)
                return reject (err)
            }
            else{
                return resolve(results)
            }
        })
    })
}

//post request
router.post('/shipmentOut',async(req,res)=>{
    try{
        const result1 = await queryPromise_extract(req.body.tokenNumber)
        console.log(result1[0].timeIn)
        let nW,WBD,diffWBD;
        nW = req.body.grossWeight-result1[0].tareWeight
        WBD = result1[0].quantity*req.body.density
        diffWBD = WBD-nW
        //Calculating litres at 60
        litres = litAt60(50000,req.body.density,req.body.temperature)
        //Calculating volume at 85
        volat85 = Volumeat85(50000,req.body.density,req.body.temperature)
        console.log(`Volume at 85 is ${volat85}`)
        let data = {
            "netWeight": nW,
            "WBD": WBD,
            "diff": diffWBD,
            "litres":litres,
            "volumeat85":volat85,
            "timeIn":result1[0].timeIn
        }
        const result2 = await queryPromise_insert(data, req)
        console.log(result2)
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})

//deletion end point
router.delete('/shipmentOut',async(req,res)=>{
    try{
        const result = await queryPromise_delete(req)
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router