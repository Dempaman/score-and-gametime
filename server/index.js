const express = require('express');
//import axios from 'axios';
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

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
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.get("/api/users", (req, res) => {
    users.getAll(function(getAllUsers) {
        console.log(getAllUsers)
      res.send(getAllUsers);
    })
  })

  /*
  app.get("/addgame_", (req, res) => {


      axios({
          url: `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com//games/${id}?fields=name,genres.name,release_dates.y,summary,storyline,cover.url, screenshots.url,involved_companies.developer,involved_companies.company.name`,
          method: 'GET',
          data: "fields alpha_channel,animated,height,image_id,url,width;"
      })
      .then(res => {
          this.props.searchResult(res.data)
          this.props.loading(true)

      })
      .catch(err => {
          console.error(err);
      });
  })
  */

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
