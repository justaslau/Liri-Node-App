# Liri-Node-App
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data and logs data and commands to TXT file.

## Commands
In the command line, the user types in one of 4 commands:
- `concert-this` to find event information by passing argument (event name) 
- `spotify-this-song` to find songs by passing argument (song name)
- `movie-this` to find movie by passing argument (movie name)
- `do-what-it-says` to run command from random.txt file

## concert-this
The user types in `concert-this` and the name of a band/artist and liri.js takes that information and makes a call to the bands in town api. The output displays the name of the venue, venue location, and date of the event.

![concert-this](images/concert.png)

## concert-this
![concert-this](concertThis.png) 

The user types in 'concert-this' and the name of a band/artist and liri.js takes that information and makes a call to the bands in town api. The output displays the name of the venue, venue location, and date of the event.


## movie-this
![movie-this](movieThis.png) 

The user types in 'movie-this' and the name of a movie. Liri.js takes that information and makes a call to the omdb api. The output displays the title of the movie, year, imdb rating, rotten tomatoes rating, country where it was produces, language of the movie, plot, and the actors in the movie. 


## spotify-this-song
![spotify-this-song](spotifyThis.png)

The user types in 'spotify-this-song' and the name of a song. Liri.js takes that information and makes a call to the spotify api. The output displays the artist name, song name, preview link (if availabe), and the album that the song is from. If the user does not initially specify a song, then 'The Sign' by Ace of Spades is displayed.


## log.txt file
![log.txt](logSS.png)
Once the user inputs the info that they are looking for, that output is then appended to a 'log.txt' file.
In this case, the user utilized all of the commands.
