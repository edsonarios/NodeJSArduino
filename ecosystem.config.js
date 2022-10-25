module.exports = {
    apps: [
        {
            name: 'mqtt',
            script: './mqtt/server.js',
            watch: true,
        },
        //User
        {
            name: 'socket',
            script: './socket/server.js',
            watch: true,
        },
    ]
}
