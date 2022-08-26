const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {});
    primus.on('connection', (spark) => {
        console.log('Primus connected');

        spark.on('data', (data) => {
            console.log("spark says:" + data.message);
            primus.write("you said: " + data.message); 
        })
    })
}

module.exports.go = go;