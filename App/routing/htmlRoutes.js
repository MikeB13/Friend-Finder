// LOAD DATA

var friends = require("../data/friends");

// ROUTES

module.exports = function(app) {
    // API GET Requests

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // API POST Requests

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        var userData = req.body;
        var userScores = userData.scores;


        var totalDifference;

        // loop through all the friend possibilities in the database.
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            // then loop through the scores of each friend
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        friends.push(userData);

        res.json(bestMatch);
    });
};