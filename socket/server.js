'use strict'
require('dotenv').config({
    path: `../../.env.${process.env.NODE_ENV || 'development'}`
})
const chalk = require('chalk')
const mqtt = require('mqtt')
const { parsePayload } = require('../mqtt/utils')
const express = require('express')
const asyncify = require('express-asyncify')
const app = asyncify(express())
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const port = parseInt(process.env.SOCKET_PORT) || 1884
let client = mqtt.connect('mqtt://localhost:1883')
client.subscribe('arduino')

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('front disconnected')
    })
    socket.on('connect', () => {
        console.log('front connected')
    })

    socket.on('arduino', payload => {
        console.log('mqtt publish', payload)
        var data = Buffer.from(JSON.stringify(payload));
        client.publish('arduino', data)
    })
    client.on('message', (topic, payload) => {
        // mqtt pub -t 'arduino' -h localhost -m '{"pin":2,"action":0}'
        let data = parsePayload(payload)
        console.log('socket emit', topic, data)
        socket.emit(topic, data)
    })
})

server.listen(port, () => {
    console.log(`${chalk.green('[mod-socket]')} server listening on port ${port}`)
})
