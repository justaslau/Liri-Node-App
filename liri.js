require("dotenv").config();
var inputCommand = process.argv[2];
var inputDetail = process.argv.slice(3).join(" ");
var functions = require("./functions.js");
if (inputCommand === "concert-this") {
	var apiURL = "https://rest.bandsintown.com/artists/" + inputDetail + "/events?app_id=codingbootcamp";
	functions.searchConcert(apiURL);
} else if (inputCommand === "spotify-this-song") {
	limit = 10;
	if (!inputDetail) {
		inputDetail = "Ace of Base The Sign";
		limit = 1;
	}
	functions.searchSong(inputDetail, limit);
} else if (inputCommand === "movie-this") {
	if (!inputDetail) {
		inputDetail = "Mr. Nobody";
	}
	var apiURL = "http://www.omdbapi.com/?t=" + inputDetail + "&y=&plot=short&apikey=trilogy"
	functions.searchMovie(apiURL);
} else if (inputCommand === "do-what-it-says") {
	functions.logToFile(inputDetail);
} else {
	// Future Improve Inquirer
	console.log("prompt choices");
}