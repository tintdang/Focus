require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('ajax-request');
var song = process.argv.slice(2).join(" ");

spotify.search({type: 'track', query: song}, function(err, data){
    if(err) {
        console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].uri);
    var token = "BQAgNwkQ8g3SJn-LhZfDwWcSI7l0Y0RhPhwzsQ-4Im60Qk19UZwyM-gMUYK4APYZCyVDpcOdS92fE-4AetUZmAdWYAR0LyVg6qm8kpUtlRcFuIWU9-VinETrdl5CDMINSTF6rrnid-GWoyeRsgtmo3x-1_zgPmmXxdSvtteLozGdjXEOqQc";

    request.post({
        url: 'https://api.spotify.com/v1/playlists/24eowb9lZkZezxXVxpm4cp/tracks?uris=' + data.tracks.items[0].uri,
        data: {uris: data.tracks.items[0].uri},
        headers: {
            Authorization: "Bearer " + token
        }
    }
    , function(err, res, body){
        if(err) throw err;
        console.log(body);
    })
})
