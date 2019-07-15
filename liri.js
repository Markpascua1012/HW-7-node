require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

// var Spotify = require('node-spotify-api');


var command = process.argv[2];

var artist = process.argv[3];





if (command === "concert-this") {

    // node liri.js concert-this <artist/band name here>
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response.data)
    })
    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    // Name of the venue

    // Venue location

    // Date of the Event (use moment to format this as "MM/DD/YYYY")


}


if (command === "movie-this") {
    var movieName = process.argv[3];
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(function (response) {

        console.log("----------------------------")
        // * Title of the movie.
        console.log("Title: " + response.data.Title);
        // * Year the movie came out.
        console.log("Year: " + response.data.Year);
        // * IMDB Rating of the movie.
        console.log("IMDB Rating: " + response.data.imdbRating);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings.RottenTomatoes)
        // * Country where the movie was produced.
        console.log("Country: " + response.data.Country)
        // * Language of the movie.
        console.log("Language: " + response.data.Language)
        // * Plot of the movie.
        console.log("Plot: " + response.data.Plot)
        // * Actors in the movie.
        console.log("Actors: " + response.data.Actors)

    })
}



