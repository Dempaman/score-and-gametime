const {createServer} = require('http')
const express = require('express');
const bodyParser = require("body-parser");
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const normalizePort = port => parseInt(port, 10);
const PORT =  normalizePort(process.env.PORT || 5000)

const app = express();
const dev = app.get('env') !== 'production'

const users = require("./src/server/mongoClient.js")

app.use(bodyParser.json());


if (!dev) {
    app.disable('x-powered-by')
    app.use(compression())
    app.use(morgan('common'))

    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html' ))
    })

    app.get("/api/users", (req, res) => {
      users.getAll(function(getAllUsers) {
          console.log(getAllUsers)
        res.send(getAllUsers);
      })
    })

}

if (dev) {
    app.use(morgan('dev'))
}

const server = createServer(app)

app.get("/api/users", (req, res) => {
  users.getAll(function(getAllUsers) {
      console.log(getAllUsers)
    res.send(getAllUsers);
  })
})

server.listen(PORT, err => {
    if (err) throw err;

    console.log('Server started')
});
