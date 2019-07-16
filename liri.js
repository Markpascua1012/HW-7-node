require("dotenv").config();
var moment = require("moment");

var axios = require("axios");

var fs = require("fs");


var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);




var command = process.argv[2];







function concertThis(artist) {

    // node liri.js concert-this <artist/band name here>
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        // console.log(response.data)
        var time = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("~~~~~~~~~~~~~~~~~~")
        console.log(response.data[0].lineup[0])
        console.log(response.data[0].venue.name)
        console.log(response.data[0].venue.city)
        console.log(time)
        console.log("~~~~~~~~~~~~~~~~~~")

    })


    // Name of the venue
    // console.log(reponse.data[0].venue.name)
    // Venue location
    // console.log(respnse.data[0].venue.city)
    // Date of the Event (use moment to format this as "MM/DD/YYYY")


}


function movieThis(movieName) {

    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(function (response) {
        if (movieName === undefined) {
            movieName = "Mr.Nobody"
            console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
            console.log("It's on Netflix")
            return movieThis(movieName);
        } else {
            console.log("~~~~~~~~~~~~~~~~~~")
            // * Title of the movie.
            console.log("Title: " + response.data.Title);
            // * Year the movie came out.
            console.log("Year: " + response.data.Year);
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + response.data.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            // * Country where the movie was produced.
            console.log("Country: " + response.data.Country)
            // * Language of the movie.
            console.log("Language: " + response.data.Language)
            // * Plot of the movie.
            console.log("Plot: " + response.data.Plot)
            // * Actors in the movie.
            console.log("Actors: " + response.data.Actors)
            console.log("~~~~~~~~~~~~~~~~~~")
        }

    })
}



function spotifyThis(songName) {
    spotify
        .search({ type: 'track', query: songName, limit: 1, })
        .then(function (response) {
            if (songName === undefined) {
                songName = "The Sign ace"
                return spotifyThis(songName)
            } else {
                var spot = response.tracks.items[0]
                // console.log(spot)
                console.log("~~~~~~~~~~~~~~~~~~")
                console.log("Artist: " + spot.artists[0].name)
                console.log("Song Name: " + spot.name)
                console.log("Preview Link: " + spot.preview_url)
                console.log("Album: " + spot.album.name)
                console.log("~~~~~~~~~~~~~~~~~~")
            }

        })
        .catch(function (err) {
            console.log(err);
        });

}

//     Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from


function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        
        if (error) {
            return console.log(error);
        }




        var dataArr = data.split(",");

        var name = dataArr[1]

        spotifyThis(name);

        
        console.log(dataArr);

    });

}

function addThis() {
    fs.appendFile("random.txt",", "  + "spotify-this-song," + "'" + process.argv[3] + "'", function (err) {

        
        if (err) {
            return console.log(err);
        }

        
        console.log("random.txt was updated!");

    });
}

function runcommand(command, data) {
    if (command === "concert-this") {
        concertThis(data)
    };
    if (command === "movie-this") {
        movieThis(data)
    }
    if (command === "spotify-this-song") {
        spotifyThis(data)
    }
    if (command === "do-what-it-says") {
        doThis()
    }
    if (command === "add-this"){
        addThis()
    }

}
var term = process.argv.slice(3).join(" ");
runcommand(command, term)