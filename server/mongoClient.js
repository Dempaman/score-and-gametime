const Client = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://admin:mittnamn87@ds157844.mlab.com:57844/scoreandgametime"

let error = msg => {
    return { "error": msg }
}

const users = {
    getAll: function(callback) {
        Client.connect(url, { useNewUrlParser: true }, function(err, client) {
            const db = client.db("scoreandgametime")
            const collection = db.collection("users")

            let resultArray = [];
            let cursor = collection.find({}).limit(100);

            console.log("does this run?")
                cursor.forEach(function(doc, err){
                resultArray.push(doc);
            }, function(){
                client.close();
                callback(resultArray); // can't simply return a value from an asynchronous function call. Thats why a callback was needed here (https://stackoverflow.com/questions/42235886/express-res-send-is-not-returning-the-result-of-my-module-exported-function-that)
            });
        });
    },

    createOrUpdate: function(req, callback) {
        console.log(req.body)
        let status = {
            _id: req.query._id || null,
            uid: req.query.uid,
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
                $set: { uid: status.uid, /*imestamp: status.timestamp, likes: status.likes, comments: status.comments */}
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
    }
}

module.exports = users
