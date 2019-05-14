require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require('moment');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var input = process.argv.slice(3).join(" ");
if (action === "spotify-this") {
    spotify.search({ type: "track", query: input }, function (
        err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        let songs = data.tracks.items;
        // songs.forEach(function (data) {
        //     const song = {};
        //     song.artist = data.album.artists[0].name;
        //     song.album = data.album.name;
        //     song.name = data.name;
        //     song.preview = data.external_urls.spotify;
        //     return song;
        // });
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].album.external_urls.spotify);
        fs.writeFile("spotify/data.json", JSON.stringify(data.tracks.items[0], null, 2), () => { });

    });

} else if (action !== "spotify-this" && action !== "movie-this" && action !== "do-what-it-says") {
    
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (response) {
        console.log("Venue name: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        console.log("Date of Event: " + moment(response.data.datetime).format("MM/DD/YYYY"));
       
    }
    ).catch(function (error) {
        console.log(error);
    })
    
} else if (action !== "spotify-this" && action !== "concert-this" && action !== "do-what-it-says") {
    console.log(input)
    if (input === ""){
        // axios.get("http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&apikey=trilogy");
        input = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy").then(function (data) {
        console.log(data.data.Title);
        console.log(data.data.Year);
        console.log(data.data.imdbRating);
        console.log(data.data.Ratings[1]);
        console.log(data.data.Country);
        console.log(data.data.Language);
        console.log(data.data.Plot);
        console.log(data.data.Actors);
        //Need help returning Mr. Nobody
    } 
    ).catch(function (error) {
        console.log(error);
    }) 
 
} else if (action !== "spotify-this" && action !== "concert-this" && action !== "movie-this") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            (action === "spotify-this")
            spotify.search({ type: "track", query: "I Want it That Way" }, function (
                err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }
                console.log(data.tracks.items[0].name);
            })
        }
    })
}       

