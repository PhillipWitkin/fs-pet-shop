let fs = require('fs');
const http = require('http');

const port = 8000;

// creating a HTTP server
const server = http.createServer( (request, response) => {
    // When it gets an incoming request on the listening port.... 
    console.log("request", "Recieved request");
    const URL = request.url;
    const method = request.method;
    
    console.log(URL); // /pets/1 
    const splitUrlArray = URL.split("/"); // -> ["pets", "1"]
    const petNumString = splitUrlArray[2]; // the number following pets/_
    const petNum = parseInt(petNumString);

    if (URL == "/pets"){
        // read everything inside pets.json
        // findAllPets();
        fs.readFile("./pets.json", "utf8", function(err, data){
            // TODO check for error when reading file
            if (err){
                // set response code to 404
                response.statusCode = 404;
                response.end("Internal server error");
                return;
            }

            const allPets = JSON.parse(data); // whole array of objects
            console.log("allPets: ", allPets);
                // send data back with response object
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            response.end(JSON.stringify(allPets));
            
            
        });

    } else {

        console.log(`Attempting to find pet number ${petNum}`);
        fs.readFile("./pets.json", "utf8", function(err, data){
            // TODO check for error when reading file
            if (err){
                // set response code to 404
                response.statusCode = 404;
                response.end("Internal server error");
                return;
            }
            // turn data from string to JS object
            const allPets = JSON.parse(data); // all pet objects in array
            // TODO - make sure petNum is in bounds, if its not, 404 status code
            
            const singlePet = allPets[petNum]
            if (!singlePet){
                response.statusCode = 404;
                response.setHeader('Content-Type', "text/plain");
                response.end("Not Found");
                // return
            } else {
                console.log("singlePet", singlePet);
                // send data back with response object
                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 200;
                response.end(JSON.stringify(singlePet));
            }
        });
    }

    function findAllPets(){

    }

    function findOnePet(petNum){
        
    }

});

server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})















