
var io = require('socket.io')(3000);

/**
 * connection
 */
io.sockets.on('connection', function (socket) {

  /**
   * disconnect
   */
  socket.on('disconnect', function () {
    socket.leave(socket.data.room);
  });

  /**
   * メンバーを追加　
   */
  socket.on('add:member', function(data) {
    socket.data = data;
    socket.join(data.room);
    io.sockets.to(socket.data.room).emit('insert:message', socket.data.message);
  });

  /**
   * メッセージを挿入
   */
  socket.on('insert:message', function (data) {
    io.sockets.to(socket.data.room).emit('insert:message', data.message);
  });

});

