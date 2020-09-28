const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/getUser': jsonHandler.getUser,
    '/notFound': jsonHandler.notFound,
  },
  HEAD: {
    '/getUser': jsonHandler.getUserMeta,
    '/notFound': jsonHandler.notFoundMeta,
  },
  POST: {
    '/addUser': jsonHandler.addUser,
    '/addBirthday': jsonHandler.addUser,
  }
};

const onRequest = (request, response) => {
  
  
  // get the URL data
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);

  // get the queries
  const params = query.parse(parsedUrl.query);

  console.log(`${request.method} ${parsedUrl.pathname} ${params.name}`);

  if (request.method === 'POST') {
    const body = [];
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyStr = Buffer.concat(body).toString();
      params = query.parse(bodyStr);

      urlStruct['POST'][parsedUrl.pathname](request, response, params);
    });
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method]['/notFound'](request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
