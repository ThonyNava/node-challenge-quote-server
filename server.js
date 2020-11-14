// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const _ = require("lodash");

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", function (request, response) {
  response.send(
    "Welcome to Thony's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...

app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  // response.send(pickFromArray(quotes));
  response.send(_.sample(quotes));
});

// '/quotes/search?term=jobs'
app.get("/quotes/search", function (request, response) {
  const term = request.query.term.toLowerCase();
  console.log("This is the term: " + term);

  // const filtQuotes = quotes.filter((quote) => {
  //   return quote.quote.includes(term);
  // });

  const filtQuotes = quotes.filter((quote) => {
    let wordsOfQuote = quote.quote.toLowerCase();
    let wordsOfAuthor = quote.author.toLowerCase();

    if (wordsOfQuote.includes(term) || wordsOfAuthor.includes(term)) {
      return true;
    } else {
      return false;
    }
  });

  filtQuotes.length > 0
    ? response.send(filtQuotes)
    : response.send(`Ups! ${term} does not match any result!`);

  // response.send(pickFromArray(quotes));
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
