require("dotenv").config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");

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
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function (data) {
        console.log(data.data);
    }
    ).catch(function (error) {
        console.log(error);
    })
} else if (action !== "spotify-this" && action !== "concert-this" && action !== "do-what-it-says") {
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(function (data) {
        console.log(data.data);
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

