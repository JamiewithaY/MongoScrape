//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
//requiring the two models
var Articles = require("./models/articles.js");
var Comments = require("./models/comments.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Initialize Express
var app= express();

app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose- this is mLab which is what will diploy the db with heroku
mongoose.connect("mongodb://heroku_mh1lfrkh:2f32rs88a8pimiqcd50v0iflq6@ds161584.mlab.com:61584/heroku_mh1lfrkh");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


//Routes
//this will scrape the website 
app.get("/scrape", function(req,res){

	//first to grab the body of the html with request
	request("http://www.nfl.com/news", function(error, response, html){

		//load into cheerio for a shorthand selector
		var $ = cheerio.load(html);

		//select the elements and such that I want to pull from the site
		$("h3").each(function(i, element){
			var result = {};

			result.title = $(this).children(".heading").text();
			result.link = $(this).children("a").attr("href");

		//using the article model, create a new entry and pass the results to the entry with the title and link
		
		//save to db
		entry.save(function(err, doc){
			if (err){
				console.log(err);
			} else {
				console.log("you did it!");
				console.log(doc)

			}
		});	
		});
	})
});

















