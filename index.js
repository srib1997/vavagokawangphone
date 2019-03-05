var five = require('johnny-five')
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const board = new five.Board({ port: "/dev/cu.usbmodem144201"})

board.on('ready', function () {
  forward = new five.Led(2)
  back = new five.Led(3)
  right = new five.Led(4)
  left = new five.Led(5)
  buttonPush = new five.Led(6)
  coin = new five.Led(7)

  forward.off()
  back.off()
  right.off()
  left.off()
  buttonPush.off()
  coin.off()
})

io.on('connection', function (socket) {
  socket.on('forward', function () {
    forward.on()
  })
  socket.on('forwardUp', function () {
    forward.off()
  })

  socket.on('back', function () {
    back.on()
  })
  socket.on('backUp', function () {
    back.off()
  })

  socket.on('left', function () {
    left.on()
  })
  socket.on('leftUp', function () {
    left.off()
  })

  socket.on('right', function () {
    right.on()
  })
  socket.on('rightUp', function () {
    right.off()
  })

  socket.on('buttonPush', function () {
    buttonPush.on()
  })
  socket.on('buttonPushUp', function () {
    buttonPush.off()
  })

  socket.on('coin', function () {
    coin.on()
  })
  socket.on('coinUp', function () {
    coin.off()
  })
})

http.listen(3001, function () {
console.log('listening on *:' + 3001)
})