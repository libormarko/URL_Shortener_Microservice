# API Project: URL Shortener Microservice

A MERN full-stack JavaScript web development project. I wrote a blog post about the project, where you can read about programming concepts I used and about app's features and functionality. You can find it on my [medium profile](https://medium.com/@marko.libor/url-shortener-microservice-e841b364155c).

## Technologies used
* Node.JS
* Express
* MongoDB
* Mongoose
* API
* JSON
* React.JS
* JavaScript 
* HTML5
* CSS3

## User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.


## Creation Example:

POST https://url-shortener-lm.glitch.me/api/shorturl/new - body (urlencoded) :  url=https://libormarko.github.io/

## Usage:

https://url-shortener-lm.glitch.me/api/shorturl/63793

## Will redirect to:

https://libormarko.github.io/