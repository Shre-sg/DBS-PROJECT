const http = require('http');

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        res.write('hello world');
        res.end(); // Corrected line
    }


    if (req.url === '/api/cou') {
        res.write(JSON.stringify([1,3,4]));
        res.end(); // Corrected line
    }
    
});

server.listen(3000);
console.log('LISTENING TO 3000 PORT');
