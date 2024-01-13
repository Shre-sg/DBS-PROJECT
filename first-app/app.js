const http = require('http');

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        res.write('hello world');
        res.end(); // Corrected line
    }
    
});

server.listen(3000);
console.log('LISTENING TO 3000 PORT');
