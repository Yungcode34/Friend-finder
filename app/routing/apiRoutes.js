//The friends dependancies
var friendsList = require('../data/friendsdata.js');

var bodyParser = require('body-parser');
var path = require('path');

module.exports = function (app) {

    // Search for Specific Character (or all characters) - provides JSON
    app.get('/api/friends', function (req, res) {
        res.json(friendsList);
    });

    //Creating New Characters - takes in JSON data

    app.post('/api/friends', function (req, res) {

        //The functions that will return our match
        var bestMatch = {
            'name': 'none',
            'photo': 'none'
        };

        function sum(array) {
            var total = 0;
            for (var n = 0; n < array.length; n++) {
                total += parseInt(array[n]);

            }
            return total;
        }
        var newFriends = (req.body);
        var userTotal = sum(req.body.scores);

        var friendTotal = 0;

        for (var i = 0; i < friendsList.length; i++) {
            friendTotal = sum(friendsList[i].scores);
            //console.log(friendTotal);
            if (friendTotal == userTotal) {
                bestMatch.name = friendsList[i].name;
                bestMatch.photo = friendsList[i].photo;
            }
        };
        if (bestMatch.name == 'none') {
            var closest = 50;

            for (var i = 0; i < friendsList.length; i++) {
                friendTotal = sum(friendsList[i].scores);
                var difference = Math.abs(friendTotal - userTotal);
                if (difference <= closest) {
                    closest = difference;
                    bestMatch.name = friendsList[i].name;
                    bestMatch.photo = friendsList[i].photo;
                };
            };
        };
        friendsList.push(newFriends);
        res.json(bestMatch);
    });
};