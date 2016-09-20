'use strict';
module.exports = function(request, reply) {
  var context = {};
  context.meta = {
    title: 'Testing CORS'
  };
  context.uri = request.info.host;
  reply.view('ajax', context);
};
