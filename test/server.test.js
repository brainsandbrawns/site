'use strict';

const test = require('tape');
const server = require('../server.js');
const Hapi = require("hapi");

test('Initial set up test', (t) => {
  t.plan(1);
  t.equal(2 + 1, 3, 'Tape works!');
});

test('Server should start', (t) => {
  t.plan(1);

  t.equal(server instanceof Hapi.Server, true, "Server is an instance of the Hapi Server")
  t.end();
});

//preventing from hanging tests
test('teardown', (t) => {
  server.stop((err) => {
    if (err) {
      console.log('Termination error: ' + err);
    }
  });
  t.end();
});
