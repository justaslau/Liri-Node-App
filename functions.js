var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var Table = require('cli-table');

// Function to append users' input to log TXT file
function logToFile(table, command, input) {
	var newLine = "\n";
	var appendData = [newLine + command + input + newLine];
	for (var i = 0; i < table.length; i++) {
		for (var j = 0; j < table[i].length; j++) {
			appendData.push(table[i][j]);
		}
		appendData.push(newLine);
	}
	fs.appendFile("log.txt", appendData.join(" "), function(err) {
		if (err) {
			console.log("Error: " + err);
		} else {
			console.log("log.txt was updated.")
		}
	});
}

module.exports = {
	// Function to find concert and print info
	searchConcert: function(apiURL, inputDetail) {
		axios.get(apiURL).then(function(response) {
			var recordsFound = response.data.length;
			if (recordsFound !== 0) {
				var tableHead = ["#", "Name of The Venue", "Venue Location", "Event Date"];
				var table = new Table({
					head: tableHead,
					colWidths: [4, 50, 40, 12]
				});
				for (var i = 0; i < recordsFound; i++) {
					var venueName = response.data[i].venue.name;
					var venueLocation = response.data[i].venue.city + ", " + response.data[i].venue.country;
					var dateOfEvent = moment(response.data[i].datetime).format("MM/DD/YYYY");
					table.push([i + 1, venueName, venueLocation, dateOfEvent]);
				}
				console.log(table.toString());
				logToFile(table, " concert-this ", inputDetail);
			} else {
				console.log("Events not found by this artist/band.")
			}
		});
	},
	// Function to find song and print info
	searchSong: function(inputDetail, limit) {
		spotify.search({
			type: 'track',
			query: inputDetail,
			limit: limit
		}).then(function(response) {
			var recordsFound = response.tracks.items.length;
			if (recordsFound !== 0) {
				var tableHead = ["#", "Artists", "Song Title", "Album", "Released"];
				var table = new Table({
					head: tableHead,
					colWidths: [4, 50, 40, 50, 15]
				});
				for (var i = 0; i < recordsFound; i++) {
					var artist = response.tracks.items[i].artists[0].name;
					var song = response.tracks.items[i].name;
					var album = response.tracks.items[i].album.name;
					var released = response.tracks.items[i].album.release_date;
					table.push([i + 1, artist, song, album, released]);
				}
				console.log(table.toString());
				logToFile(table, " spotify-this-song ", inputDetail);
			} else {
				console.log("Song or artist not found.")
			}
		}).catch(function(err) {
			console.log("Error: " + err);
		});
	},
	// Function to find movie and print info
	searchMovie: function(apiURL, inputDetail) {
		axios.get(apiURL).then(function(response) {
			var tableHead = ["Movie Title", "Released", "Country", "Language", "IMDB", "Tomatoes"];
			var table = new Table({
				head: tableHead,
				colWidths: [50, 20, 30, 15, 10, 10]
			});
			if (response.data.Response !== "False") {
				movieTitle = response.data.Title;
				movieReleased = response.data.Released;
				movieCountry = response.data.Country;
				movieLanguage = response.data.Language;
				imdbRating = response.data.imdbRating;
				if (response.data.Ratings.length >= 2) {
					tomatoesRating = response.data.Ratings[1].Value;
				} else {
					tomatoesRating = "N/A"
				}
				table.push([movieTitle, movieReleased, movieCountry, movieLanguage, imdbRating, tomatoesRating]);
				console.log(table.toString());
				logToFile(table, " movie-this ", inputDetail);
			}
		});
	}
}