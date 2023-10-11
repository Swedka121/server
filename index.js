const express = require("express")
const cors = require("cors")
const fs = require("fs")
const mongoose = require("mongoose")
const Item = require("./models/Item")
const Config = require("./models/Config")
const app = express()
const path = require("path")
const multer  = require('multer')
const FileMiddleware = require("./middleware/file")

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions))
app.use(express.json())
app.use("/asset",express.static("./assets"))
app.use("/hero",express.static("./hero"))
const db ="mongodb+srv://Admin:123123123@shop.zbj4nkw.mongodb.net/?retryWrites=true&w=majority"
mongoose
 .connect(db)
 .then(() => console.log("Connected to DB"))
 .catch((err) => console.log(err))

app.get("/api/gethero/", (req, res) => {
    const Data_to_res = []
    fs.readdir(path.join(__dirname,"/hero"), (err, data) => {
        if (err) {console.log(err); res.sendStatus(404)}
        var i = 0
        data.forEach(element => {
            var Object1 = {}
            Object1.img = "http://localhost:9001/hero/" + element
            Object1.id = i
            Data_to_res.push(Object1)
            i++
        })
        res.json({data: Data_to_res})   
    })
})
app.get("/api/getconfig/", async (req, res) => {
    const toRes = await Config.find({}).exec()
    res.json({toRes})
})
app.get("/api/getitems/", async (req, res) => {
    const toRes = await Item.find({}).exec()
    res.json({data: toRes})
})
app.post("/api/getitems/filter/", async (req,res) => {
    const { types } = req.body
    console.log(req.headers)
    const toRes = await Item.find({type: types}).exec()
    res.json({data: toRes})
})
app.post("/api/additem/", FileMiddleware.single("img") , (req, res) => {
    const { title, des, price, type, op1n , op2n, op3n, op4n, op5n, op6n, op7n, op8n, op9n, op10n, op1v , op2v, op3v, op4v, op5v, op6v, op7v, op8v, op9v, op10v} = req.body
    const img = req.file
    const img_url = "http://localhost:9001/asset/" + img.filename
    const NewItem = new Item({title:title,des:des,price:price,type: type,img: img_url, options:[{title: op1n, value: op1v},{title: op2n, value:op2v},{title: op3n, value:op3v},{title: op4n, value:op4v},{title: op5n, value:op5v},{title: op6n, value:op6v},{title: op7n, value:op7v},{title: op8n, value:op8v},{title: op9n, value:op9v},{title: op10n, value:op10v}]})
    NewItem.save()
    res.sendStatus(200)
})
app.post("/api/getitem", async (req, res) => {
    const { id } = req.body
    const data = await Item.findById(id).exec()
    res.json(data)
})



app.listen(9001, function () {
    console.log(`listen on port 9001`)
})