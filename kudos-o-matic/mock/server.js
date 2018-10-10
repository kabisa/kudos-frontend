/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-unresolved: off */
/* eslint no-console: 0 */
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
const faker = require('faker');

// Functions

function generateUsers() {
  const users = [];
  for (let id = 0; id < 10; id += 1) {
    users.push({
      id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      avatar_url: faker.internet.avatar(),
      description: faker.hacker.phrase(),
      location: faker.address.state()
    });
  }
  return users;
}

function generateTransactions() {
  const transactions = [];
  for (let id = 0; id < 25; id += 1) {
    transactions.push({
      id,
      author: {
        id: Math.floor(Math.random() * 10),
        name: faker.name.findName(),
        avatar_url: faker.internet.avatar()
      },
      receivers: generateUsers().splice(0, Math.floor(Math.random() * 9)),
      message: faker.hacker.phrase(),
      kudos: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 50),
      likes: Math.floor(Math.random() * 50),
      created_on: faker.date.recent(),
      liked: faker.random.boolean()
    });
  }
  return transactions;
}

function isAuthorized(req) {
  return req.headers.token === '123';
}

const schema = {
  transactions: generateTransactions(),
  users: generateUsers()
};

const server = jsonServer.create();
const router = jsonServer.router(schema);
const middlewares = jsonServer.defaults();

// Middleware

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  // Request delay
  setTimeout(next, 250);
});
server.use((req, res, next) => {
  // Authentication
  if (req.path === '/login') {
    next();
  } else if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(401);
  }
});
server.use((req, res, next) => {
  // Log all post requests
  if (req.method === 'POST') {
    console.log(req.body);
  }
  next();
});

// Routes

server.post('/login', (req, res) => {
  if (req.body.username === 'username' && req.body.password === 'password') {
    res.jsonp({ token: '123' });
  } else {
    res.sendStatus(401);
  }
});

server.get('/users/query', (req, res) => {
  const retList = [];
  const users = generateUsers();
  for (let i = 0; i < 3; i += 1) {
    const j = Math.floor(Math.random() * 7);
    retList.push(users.pop(j));
  }

  res.jsonp(retList);
});

server.get('/goals/next', (req, res) => {
  res.jsonp({
    percentage: 35
  });
});

server.use(router);
server.listen(3001, '0.0.0.0', () => {
  console.log('JSON Server is running');
});
