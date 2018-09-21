/* eslint import/no-extraneous-dependencies: off */
/**
 * Mock server
 *
 * Make requests to :3001
 * To authorize make a request to /login with
 * x-www-form-urlencoded
 * - username: username
 * - password: password
 */
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

function isAuthorized(req) {
  return req.headers.token === '123';
}

server.use((req, res, next) => {
  setTimeout(next, 250);
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  if (req.body.username === 'username' && req.body.password === 'password') {
    res.jsonp({ token: '123' });
  } else {
    res.sendStatus(401);
  }
});

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3001, () => {
  /* eslint no-console: 0 */
  console.log('JSON Server is running');
});
