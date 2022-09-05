const express = require("express")
const router = express.Router()
const pool = require('../Middleware/connection')
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()


//Extract All QueryPromise
queryPromise_extractALL = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM shipmentin',(err,results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}
//Extract BY Token QueryPromise
queryPromise_extractByToken = (tlNumber)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`select * from shipmentin where tlNumber="${tlNumber}"`,(error,results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        })
    })
}

//Insert data QueryPromise
queryPromise_Insert = (req)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`Insert into shipmentIn values(null,"${req.body.tlnum}","${req.body.products}",${req.body.token},${req.body.quantity},"${req.body.shift}","${req.body.customer}","${req.body.transfertype}","${req.body.date_in}",${req.body.time_in},${req.body.tare_weight},"${req.body.remarks}")`,(error,results)=>{
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

//Edit data QueryPromise
queryPromise_Edit = (req)=>{
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
        pool.query(sql,(error,results)=>{
            if(err){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

//Delete data by serialNumber QueryPromise
queryPromise_Delete = (serialNumber)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`delete from shipmentin where serialNumber = ${req.body.serialNumber}`,(error,results)=>{
            if(error){
                return reject(error)
            }
            return resolve(results)
        })
    })
}

//Extract All EndPoint
router.get('/decantingIn',jsonParser,async (req,res)=>{
    try{
        const results =await queryPromise_extractALL();
        console.log(results);
        res.send(results)
    }
    catch(error){
        console.log(error)
        res.send(error);
    }
})

//Extract By Token EndPoint
router.get('/decantingIn',async (req, res)=>{
    try{
        const results = await queryPromise_extractByToken(req.body.tlNumber);
        console.log(results);
        res.send(results);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
});

//Insert data EndPoint
router.post('/decantingIn',async (req,res)=>{
    try{
        const results = await queryPromise_Insert(req)
        console.log(results)
        res.send(results)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

//Edit EndPoint
router.put('/decantingIn',async (req,res)=>{
    try{
        const results =await queryPromise_Edit(req);
        console.log(results)
        res.send(results)
    }
    catch(error){
        console.log(error);
        res.send(error)
    }
})

//Delete data EndPoint
router.delete('/decantingIn',async (req,res)=>{
    try{
        const results = await queryPromise_Delete(req.body.serialNumber);
        console.log(results)
        res.send(results)
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})

module.exports = router