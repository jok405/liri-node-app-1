// @author: Thomas Thompson
// @github: tomtom28
// @comment: HW 10 (LIRI Node App)



// Link in Node Packages
var fs = require('fs'); // Included with Node.js --> Read/Write files
var request = require('request'); // https://www.npmjs.com/package/request --> API request client
var spotify = require('spotify'); // https://www.npmjs.com/package/spotify --> Spotify API client library
var Twitter = require('twitter'); // https://www.npmjs.com/package/twitter --> Twitter API client library


// Link in API Keys for Twitter
var apiKeys = require('./keys.js');


// Collect the User Command Tyoe
var commandType = process.argv[2];


// Collect the User Command String
var commandString = process.argv[3];




// =================================== Log all inputs the user makes ===================================

// Variable to log every input (good or bad) into log.txt
var addToLog = "";

// Loop through all of process.argv
for(var i = 2; i < process.argv.length; i++){
  addToLog += process.argv[i] + " ";
}
addToLog = addToLog.substring(0, addToLog.length - 1); // remove the last space

// Append the log to the txt file (with a line break)
fs.appendFile("log.txt", addToLog + '\n', function(err) {
  
  // If an error in logging was experienced, inform the user. Otherwise, proceed.
  if(err){
    console.log('Error in user logging: ' + err);
  }

});



// =================================== Input Arguments Logic ===================================

// Switch case for the User Command Types
switch(commandType){

  // Case 1 - Twitter
  case 'my-tweets':
    callTwitter();
    break;


  // Case 2 - Spotify
  case 'spotify-this-song':
    callSpotify(commandString);
    break;


  // Case 3 - IMBD (Request)
  case 'movie-this':
    callMovieRequest(commandString);
    break;


  // Case 4 - FS Read
  case 'do-what-it-says':
    callWhatItSays();
    break;


  // Case 00 - Handle Invalid Entry
  default:

    // Skip a line in console
    console.log('');

    // Prompt User
    console.log('Please pass in a valid LIRI command type...' + '\n' + 'Ex: "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"');
}




// =================================== Functions to Call APIs ===================================


// Twitter Function
function callTwitter(){

  // Skip a line in console
  console.log('');


}

// -----------------------------------------------------------------------------------------

// Spotify Function
function callSpotify(userInput){

  // Skip a line in console
  console.log('');


  // Test if a song name was passed into LIRI
  var songName;
  if(userInput == undefined){
    // If nothing is specified, search a default song
    songName = "The Sign Ace of Base"; // needed to specify "Ace of Base" here, otherwise I got the Suicide Squad album 
  }
  else{
    // If there is an input, then collect it
    songName = userInput;
  }


  // Create a request to the Spotify API with the song specified
  spotify.search({ type: 'track', query: songName }, function(err, data) {

    // Unsucessful Query
    if ( err ) {
      console.log('Error occurred: ' + err);
      return;
    }
    // Successful Query
    else{

      // Display Song Name
      console.log('Track Name: ' + data.tracks.items[0].name);


      // Display Artist(s) - If there is more than 1 artist, then loop through them all
      var artists = "";
      for(var i = 0; i < data.tracks.items[0].artists.length; i++){
        artists += data.tracks.items[0].artists[i].name + ", ";
      }
      artists = artists.substring(0,artists.length - 2); // remove the last comma and space
      console.log('Artist Name(s): ' + artists);


      // Display Album
      console.log('Album Name: ' + data.tracks.items[0].album.name);


      // Display Preview Link from Spotify
      console.log('Preview Song URL: ' + data.tracks.items[0].preview_url);

    }

  });

}

// -----------------------------------------------------------------------------------------

// IMDB Request Function
function callMovieRequest(userInput){

  // Skip a line in console
  console.log('');


  // Test if a move name was passed into LIRI
  var movieName;
  if(userInput == undefined){
    // If nothing is specified, search a default movie
    movieName = "Mr.+Nobody";
  }
  else{
    // If there is an input, then collect it and remove any spaces
    movieName = userInput.replace(/ /g, "+");
  }


  // Create a request URL to the OMDB API with the movie specified (include full plot and rotten tomatoes)
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&plot=full&tomatoes=true&r=json';

  // Use the Request Node Package to pull from the OMDB API
  request(queryUrl, function (error, response, body) {

    // Successful Query
    if (!error && response.statusCode == 200) {

      // Display Title
      console.log("Title: " + JSON.parse(body)["Title"]);

      // Display Year
      console.log("Year: " + JSON.parse(body)["Year"]);

      // Display Age Rating
      console.log("Rated: " + JSON.parse(body)["Rated"]);

      // Display IMDB Rating
      console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);

      // Display Country where produced
      console.log("Country of Production: " + JSON.parse(body)["Country"]);

      //Display Language of movie
      console.log("Language: " + JSON.parse(body)["Language"]);

      // Display Plot of movie
      console.log("Plot: " + JSON.parse(body)["Plot"]);

      // Display Actors in movie
      console.log("Actors: " + JSON.parse(body)["Actors"]);

      // Display Rotten Tomatoes Rating (Critic)
      console.log("Rotten Tomatoes Rating (Critics): " + JSON.parse(body)["tomatoRating"]);

      // Display Rotten Tomatoes Rating (Users)
      console.log("Rotten Tomatoes Rating (Users): " + JSON.parse(body)["tomatoUserRating"]);

      // Display Rotten Tomatoes URL
      console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);

    }
    // Unsucessful Query
    else{
      console.log('Error occurred: ' + error);
    }

  });

}

// -----------------------------------------------------------------------------------------

// Bonus (Do What It Says) Function
function callWhatItSays(){

  // Read from the random.txt file
  fs.readFile("random.txt", "utf8", function(error, data) {

    // Split the text into a command type and input
    var dataArr = data.split(",")
    var randomCommandType = dataArr[0];
    var randomCommandString = dataArr[1];

    // Display the call to the user
    console.log('');
    console.log('Running Command: ' + randomCommandType + ' ' + randomCommandString);

    // Switch case to determine which function to call
    switch(randomCommandType){

      // Case 1 - Twitter
      case 'my-tweets':
        callTwitter();
        break;


      // Case 2 - Spotify
      case 'spotify-this-song':
        callSpotify(randomCommandString);
        break;


      // Case 3 - IMBD (Request)
      case 'movie-this':
        callMovieRequest(randomCommandString);
        break;


      // Case 00 - Unable to parse meaningful command
      default:
      console.log('');
      console.log('Sorry! Something is wrong with the "random.txt" file.' + '\n' + 'Use your imagination to come up with a LIRI command.');
    
    }

  });

}