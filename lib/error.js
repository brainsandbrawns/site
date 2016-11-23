'use strict';

/**
 * Register defines an error_handler plugin
 */

exports.register = (server, options, next) => {
  // onPreResponse intercepts all errors
  server.ext('onPreResponse', (request, reply) => {

    let req = request.response;

    if (req.isBoom) {
      // reply custom error page
      return reply.view('404').code(req.output.payload.statusCode);
    }

    return reply.continue();

  });

  return next(); // continue with other plugins
};

exports.register.attributes = {
  name: 'ErrorPlugin'
};
