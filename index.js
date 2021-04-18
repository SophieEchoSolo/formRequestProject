require('dotenv').config()

const https = require('https')

const options = {
    hostname: process.env.hostName,
    port: 443,
    path: process.env.pathURL,
    method: 'GET'
}

function getThankYou() {
    return new Promise(function(resolve, reject) {
        function callback(res) {
            let fullJSON = ""

            function innerCallback(d) {
                fullJSON = fullJSON + d
            }
            res.on('data', innerCallback)

            function doneCallBack() {
                resolve(JSON.parse(fullJSON).thankYouMessage)
            }

            res.on('end', doneCallBack)
        }

        const req = https.request(options, callback)

        req.on('error', error => {
            reject(error)
        })

        req.end()

    })
}

const http = require('http');

http.createServer(async function(req, res) {
    res.write(await getThankYou()); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

async function asyncEventLoop() {
    let msg = await getThankYou();
    console.log(msg);
    let msg2 = 'hello world';
    console.log(msg2);
}