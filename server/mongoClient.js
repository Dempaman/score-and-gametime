const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://admin:mittnamn87@ds157844.mlab.com:57844/scoreandgametime"

let error = msg => {
    return { "error": msg }
}

const users = {
    getAll: function(req, callback) {
        let status = {
            uid: req.query.uid,
        }
        console.log(status.uid)
        Client.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db("scoreandgametime")
            const collection = db.collection("users")

            let resultArray = [];
            let cursor = collection.find({uid: status.uid});

                cursor.forEach(function(doc, err){
                resultArray.push(doc);
            }, function(){
                client.close();
                callback(resultArray[0]); // can't simply return a value from an asynchronous function call. Thats why a callback was needed here (https://stackoverflow.com/questions/42235886/express-res-send-is-not-returning-the-result-of-my-module-exported-function-that)
            });
        });
    },
    getGames: function(callback) {
        Client.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db("scoreandgametime")
            const collection = db.collection("users")

            let resultArray = [];

            let cursor = collection.aggregate(
                {
                    $unwind: "$games"
                },

                {
                    $group:
                        {
                            _id: "$games.gameId",
                            count: {
                                $sum: 1
                            },
                            "totalAvgScore": {
                                $avg: "$games.score"
                            },

                            //MainStory
                            "avgMainStoryHours": {
                                $avg: "$games.mainStory.h"
                            },
                            "avgMainStoryMin": {
                                $avg: "$games.mainStory.m"
                            },
                            "avgMainStorySec": {
                                $avg: "$games.mainStory.s"
                            },

                            //MainStoryBonus
                            "avgMainStoryBonusHours": {
                                $avg: "$games.mainStoryBonus.h"
                            },
                            "avgMainStoryBonusMin": {
                                $avg: "$games.mainStoryBonus.m"
                            },
                            "avgMainStoryBonusSec": {
                                $avg: "$games.mainStoryBonus.s"
                            },

                            //Completionist
                            "avgCompletionistHours": {
                                $avg: "$games.completionist.h"
                            },
                            "avgCompletionistMin": {
                                $avg: "$games.completionist.m"
                            },
                            "avgCompletionistSec": {
                                $avg: "$games.completionist.s"
                            },

                            games: { $push: "$games" },
                            playersCountOnMain: { $push: "$games.mainStory.h" },
                            playersCountOnBonus: { $push: "$games.mainStoryBonus.h" },
                            playersCountOnCompl: { $push: "$games.completionist.h" },
                        }
                },
                { $project:
                    [{
                        _id: 0, games: { $reduce: { input: "$games", initialValue: [],
                        in: { $concatArrays: ["$$this","$$value"] } } },
                    }]
                },
            )

            cursor.forEach(function(doc, err){
                resultArray.push(doc);
            }, function(){
                client.close();
                callback(resultArray);
            });
        })
    },

    createOrUpdateUser: function(req, callback) {
        let status = {
            uid: req.query.uid,
            email: req.query.email,
            displayName: req.query.displayName,
            photoURL: req.query.photoURL,
        }
        let query;
        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                callback(error(err.message))
                client.close()
                return true
            }
            const db = client.db("scoreandgametime")
            const collection = db.collection("users")

            query = {uid: status.uid};

            collection.updateOne(query, {
                $set: { uid: status.uid, email: status.email, displayName: status.displayName, photoURL: status.photoURL }
            }, { upsert: true }, function(err, res) {
                if(err) {
                    callback(error(err.message))
                    client.close()
                    return true
                }
                callback(res)
                client.close()
            })
        });
    },

    submitGame: function(req, callback) {
        let status = {
            uid: req.query.uid,
            games: req.body
        }
        let query;

        Client.connect(url, { useNewUrlParser: true }, (err, client) => {
            if(err) {
                callback(error(err.message))
                client.close()
                return true
            }
            const db = client.db("scoreandgametime")
            const collection = db.collection("users")

            query = {uid: status.uid};
            gameId = { games: status.games.gameId }

            collection.updateOne(query,
                { $pull: { games: {gameId: status.games.gameId} }},
                { $push: { games: status.games }})

            collection.updateOne(query,
                { $push: { games: status.games }},(res) => {
                callback(res)
            })

            client.close()
        });
    }
}

module.exports = users
