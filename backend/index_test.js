const express = require('express')
const app = express()

app.use(express.json()); 

app.get('/test', (req, res) => {
    try{
        const { test } = req.body
        console.log(test)
        if(!test || test !== 'test'){
            throw new Error('test failed')   
        }
        res.sendStatus(200)
    }catch(e){
        res.status(404).send('ERROR: test failed');
    }
})
module.exports = app;