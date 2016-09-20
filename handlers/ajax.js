'use strict';
module.exports = function(request, reply) {
  var context = {};
  context.meta = {
    title: 'Testing CORS'
  };
  context.currentUri = request.info.host;
  context.uris = [];
  request.server.connections.map(obj => {
    context.uris.push({
      uri: obj.info.uri,
      active: obj.info.uri.indexOf(context.currentUri) !== -1
    });
  });
  reply.view('ajax', context);
};
