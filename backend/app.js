const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Test = require("./models/test")
const cors = require("cors")
app.use(bodyParser.json())

//MIDDLEWARES
app.use(cors())

//ROUTES
app.get('/', async (req, res) =>{
    try{
        const test = await Test.find()
        res.status(200).json(test)
    }catch (err) {
        res.status(401).json({error:err})
    }
})

app.post('/', async (req, res) =>{
    const test = new Test({
        test1: req.body.test1,
        test2: req.body.test2,
        test3: req.body.test3,
    })

    try{
        const savedTest = await test.save()
        res.status(200).json(savedTest)
    } catch (err) {
        res.status(401).json({error:err})

    }
})

//delete -> delete
//update -> patch

//connect to DB
mongoose.connect(
    'mongodb+srv://queuejay:NIEtempDatabase2020@nietempdatabase-fdbbl.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Connection to DB is successful!'); },
    (e) => { console.log('Fail to connect to DB'); }
)

app.listen(5000)