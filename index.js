const http = require('http');


//GLOBAL - PC
//HTTP WEB SERVER
//   "/" root
http.createServer(function (req, res) {

    if (req.url == '/product') {


        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Products!!");
        res.end();
    }
    else {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Hello HTTP SERVER");
        res.end();
    }


}).listen(8000);