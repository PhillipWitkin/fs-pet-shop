// setup dependencies
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());


const port = 8000;

// setup routes
// get request to http://localhost:8000/index
app.get('/pets', function(req, res, next){
    // read in a file (pets.json)
    fs.readFile("./pets.json", function(err, data){
        if (err){
            next(err);
        }
        // turn data string into JS object (array of objects)
        const allPets = JSON.parse(data);
        res.send(allPets); 
    })
    
});

app.get('/pets/:petNumber/', function(req, res, next){
    const id = parseInt(req.params.petNumber);
    // use id to get pet
    console.log("id from URL", id);
    // read in a file (pets.json)
    
    fs.readFile("./pets.json", function(err, data){
        // turn data string into JS object (array of objects)
        const allPets = JSON.parse(data);
        if (id < 0 || id >= allPets.length){
            next({});
        } else {
            // use id to select pet
            res.json(allPets[id]); 
        }
    })
})

app.use((err, req, res, next)=>{
    console.log("inside app.use callback")
    console.error(err.stack);
    res.status(500).send("Not found");
})

app.post("/pets", function(req, res){
    // console.log("req", req);
    const reqData = req.body;
    console.log("reqData", reqData);
    res.send("Ok");
})

// start listening on port 
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})


