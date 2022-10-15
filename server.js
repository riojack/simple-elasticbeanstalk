const http = require('http');
const port = 7521;

const code = num => http.STATUS_CODES[num];

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  let resCode = 404;
  let resBody = '{}';

  if (method === 'GET' && url === '/') {
    resCode = 200;
    resBody = JSON.stringify({ message: 'Hello, world!' });
  }
  else if (method === 'GET' && url === '/codes') {
    resCode = 200;
    resBody = JSON.stringify(http.STATUS_CODES, null, 2);
  }
  else if (method === 'GET' && url === '/health') {
    resCode = 200;
    resBody = 'OK';
  }

  console.log(`${method} ${url} - Response: ${resCode} ${code(resCode)}`);

  res.writeHead(resCode, { 'Content-Type': 'application/json' })
  res.end(resBody);
});

server.on('close', () => console.log('Shutting down.'));

console.log(`Server started on localhost:${port}`);
server.listen(port);
