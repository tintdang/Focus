// API Key: AIzaSyDYm33n5eK_HttY7_0xXAt_7cYUS85VUOA
// https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters


// Google Places API testing
var fetch = require('node-fetch');

fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDYm33n5eK_HttY7_0xXAt_7cYUS85VUOA&input=coffee&inputtype=textquery&locationbias=ipbias', {
        contentType: 'application/json',
    }).then(body => {
    console.log(body);
    }).catch(err => {
        console.log('here is your error', err);
    })