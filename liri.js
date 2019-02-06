require("dotenv").config();
var fs = require("fs");
var inputCommand = process.argv[2];
var inputDetail = process.argv.slice(3).join(" ");
var functions = require("./functions.js");

if (inputCommand === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log("Error: " + error);
		}
		var data = data.split(",");
		inputCommand = data[0];
		inputDetail = data[1];
		checkCommand();
	});
} else {
	checkCommand();
}
// Function to detect users' command input
function checkCommand() {
	if (inputCommand === "concert-this") {
		var apiURL = "https://rest.bandsintown.com/artists/" + inputDetail + "/events?app_id=codingbootcamp";
		functions.searchConcert(apiURL, inputDetail);
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
		functions.searchMovie(apiURL, inputDetail);
	} else {
		// Future Improve Inquirer (let user select command from list if mistake in command or empty)
		console.log("Your command is not detected.");
	}
}