'use strict';

const Inert = require('inert'); // Static file and directory handlers for Hapi
const Hapi = require('hapi');
const Vision = require('vision'); //Templates rendering plugin
const Hoek = require('hoek'); // utility library for Hapi
const Handlebars = require('handlebars');

const server = new Hapi.Server();

//custom plugins
const ErrorPlugin = require('./lib/error');
const Assets = require('./lib/assets');
const Home = require('./lib/home');

server.connection({
  port: Number(process.env.PORT || 3000),
  routes: {cors: true}
});

const Plugins = [Inert, Vision, Home, Assets, ErrorPlugin];

server.register(Plugins, error => {
  Hoek.assert(!error, 'Error occured when registering plugins');

  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname + '/views',
    path: '.',
    layout: 'default',
    layoutPath: 'layout'
  });

  server.start(err => {
    Hoek.assert(!err, 'Error occured when starting server');
    console.log('Server is running at: ', server.info.uri);
  });
});

module.exports = server;
