const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const axios = require('axios');
const cors = require("cors")
const bodyParser = require('body-parser');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const users = require("./mongoClient.js")


// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

// Fork workers.
for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
});

} else {
    const app = express();

// Priority serve any static files.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get("/game:id", (req, res) => {
  res.send(req.params.id)
})

app.get("/profile", (req, res) => {
    users.getAll(req, function(getAllUsers) {
      res.send(getAllUsers);
    })
})

app.get("/api/searchresult", (req, res) => {
    users.getGames(function(getAllUsers) {
      res.send(getAllUsers);
    })
})

app.put("/api/create_user", (req, res) => {
    users.createOrUpdateUser(req, function(data) {
        res.send(data)
    })
})
app.put("/api/submitgame", (req, res) => {
    users.submitGame(req, function(data) {
        res.send(data)
    })
})

  // All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });
}
