const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const skeleton = fs.readFileSync(`${__dirname}/../client/skeleton.css`);
const bg = fs.readFileSync(`${__dirname}/../client/cake.jpg`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getStyle = (request, response) => {
  respond(request, response, style, 'text/css');
};

const getSkeleton = (request, response) => {
  respond(request, response, skeleton, 'text/css');
};

const getBackground = (request, response) => {
  respond(request, response, bg, 'image/jpeg');
};
module.exports = {
  getIndex,
  getStyle,
  getSkeleton,
};
