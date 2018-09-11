require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('ajax-request');
var song = process.argv.slice(2).join(" ");
var fetch = require('node-fetch');

spotify.search({type: 'track', query: song}, function(err, data){
    if(err) {
        console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].uri);
    var token = "BQD07napbBXIfVutJzz7UqhZlwYWYIdr5MFgM4OeKvwyF39d6-uPIhfimkOOfNxtCr82MuLkwv1AKQxFgEVScMHEsIGAcqzIjm-H_Qi_VQkjIzwUDMnxOSPefXEOI0dPd22MtNrIGCOdpdJNx_uXqAG_KVT_UF-if5WHDmSV-Q48t0bnTlo";

    fetch('https://api.spotify.com/v1/playlists/24eowb9lZkZezxXVxpm4cp/tracks?uris=' + data.tracks.items[0].uri, {
        headers: {
            'Authorization': "Bearer " + token
        },
        contentType: 'application/json',
        method: 'POST'
        // body: JSON.stringify({
        //     "uris": [data.tracks.items[0].uri]
        // })
    }).then(success => {
    console.log(success);
    }).catch(err => {
        console.log('here is your error', err);
    })
})
