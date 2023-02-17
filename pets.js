const fs = require('fs');

function init(){
    // All process.argv elements are strings
    const command = process.argv[2];
    const choice = process.argv[3]; 
    console.log("command", command);
    console.log("choice", choice);
    readPetsFile(command, parseInt(choice));
}

function readPetsFile(command, petNumber){
    if (command == "read"){
        fs.readFile("./pets.json", "utf8", function(err, data){
            if (err){
                console.error(err);
            } else {
                console.log("readFile data", data);
                console.log("typeof data:", typeof data);
                const parsedDataArray = JSON.parse(data);
                // parsedData is now a JS object, not a string
                console.log("petNumber", petNumber);
                // check if user supplied argument is within bounds of our data 
                // the outer structure is an array, so we can check its length
                if (petNumber > parsedDataArray.length - 1){
                    console.error("Can't find that pet");
                    process.exit(1);
                } else {
                    console.log(parsedDataArray[petNumber]);
                    process.exit();
                }
                
            }
        })
    }
}

init();