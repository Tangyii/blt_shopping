const http = require('http')

const PORT = 8000
const serverHandle = require('../app.js')
console.log(serverHandle);
const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('http://localhost:8000');