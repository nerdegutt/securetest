const fs = require('fs');
const hapi = require('hapi');

const server = new hapi.Server();

// Insecure server
server.connection({
  labels: 'insecure',
  host: 'insecure.example.dev',
  address: 'localhost',
  port: 3000
});

// Another insecure server, different domain
server.connection({
  labels: 'alsoinsecure',
  host: 'alsoinsecure.example.dev',
  address: 'localhost',
  port: 3001
});

// Another insecure server, different domain, CORS enabled
server.connection({
  labels: 'insecurecors',
  routes: { 
    cors: {
      origin: ["*"],
      additionalHeaders: ["Accept-language"]
    }
  },
  host: 'insecurecors.example.dev',
  address: 'localhost',
  port: 3002
});

// Secure server, no CORS
server.connection({
  labels: 'secure',
  tls: {
    key: fs.readFileSync('./secure.example.dev.key'),
    cert: fs.readFileSync('./secure.example.dev.crt')
  },
  host: 'secure.example.dev',
  address: 'localhost',
  port: 3005
});

// Another secure server, different domain
server.connection({
  labels: 'alsosecure',
  tls: {
    key: fs.readFileSync('./alsosecure.example.dev.key'),
    cert: fs.readFileSync('./alsosecure.example.dev.crt')
  },
  host: 'alsosecure.example.dev',
  address: 'localhost',
  port: 3006
});

// Another secure server, different domain, CORS enabled
server.connection({
  labels: 'securecors',
  tls: {
    key: fs.readFileSync('./securecors.example.dev.key'),
    cert: fs.readFileSync('./securecors.example.dev.crt')
  },
  routes: { 
    cors: {
      origin: ["*"],
      additionalHeaders: ["Accept-language"]
    }
  },
  host: 'securecors.example.dev',
  address: 'localhost',
  port: 3007
});

// Add handlebars++. Not really necessary, but part of my typical boilerplate...
server.register([require('vision')], (err) => {
  if (err) {
    console.error('Failed to load a plugin: ', err);
  }

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    isCached: false,
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
    layoutPath: './views/layouts',
    layout: 'layout',
    compileMode: 'sync'
  });
});

// Plugin for statics
server.register([require('inert')], (err) => {
  if (err) {
    console.error('Failed to load a plugin: ', err);
  }
});

// Routes hard coded here for now...
server.route([
  {
    method: 'GET',
    path: '/',
    handler: require('./handlers/ajax')
  },
  {
    method: 'GET',
    path: '/api/something',
    handler: (request, reply) => {
      reply('Yay! Got response from API @ ' + request.info.host);
    }
  },
  {
    method: 'GET',
    path: '/css/stylesheet.css',
    handler: function (request, reply) {
      reply.file('./static/css/stylesheet.css');
    }
  }
]);

server.start((err) => {
  if (err) {
    throw err;
  }
  server.connections.map(obj => {
    console.log('Server running at', obj.info.uri);
  });
});
