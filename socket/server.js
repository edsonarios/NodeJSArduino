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
let client

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('front disconnected')
    })
    socket.on('connect', () => {
        console.log('front connected')
    })

    // Function to coneect mqtt to specific ip from socket
    socket.on('mqttConnect', payload => {
        client = mqtt.connect(payload.toString())
        client.on('connect', () => {
            client.subscribe('monitoring', () => {
                console.log(`Subscribe to topic monitoring successful ${payload.toString()}`)
            })
        })
        console.log('front connected')
        client.on('message', (topic, payload) => {
            let data = parsePayload(payload)
            socket.emit(topic, data)
        })
    })

    socket.on('monitoring', payload => {
        var data = Buffer.from(JSON.stringify(payload));
        client.publish('monitoring', data)
    })
})

server.listen(port, () => {
    console.log(`${chalk.green('[mod-socket]')} server listening on port ${port}`)
})
