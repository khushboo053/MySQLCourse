var express = require('express');
var app = express();
var mysql = require("mysql");
var bodyParser = require('body-parser');
// var ejs = require('ejs');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "test",
});

// connection.connect();

app.get("/", function(req, res) {
    // res.send("HELLO FROM OUR WEB APP");
    var q = "SELECT COUNT(*) as count from users";
    connection.query(q, function(err, results) {
        // if(err) throw err;
        console.log(err);
        // console.log(results);
        var count = "We have " + results[0].count + " users in our db";
        // res.send(msg);
        res.render("home", {data: count});
    })
});

app.get('/joke', (req, res) => {
    var joke =
      "<strong>What do you call a dog that does magic tricks? <em>A labracadabrador.</em></strong>";
    res.send(joke);
    // res.render("home");
    
});

app.get("/random_num", (req, res) => {
    var num = Math.floor((Math.random() * 10) + 1);
    res.send(`Your lucky number is: ${num}`);
})

app.post("/register", function(req, res) {
    // console.log("Post request", req.body.email);
    // console.log(req.body);
    var person = { email: req.body.email };
    connection.query("INSERT INTO users SET ?", person, function (err, result) {
      console.log(err);
      console.log(result);
      res.redirect("/");
    });
})

app.listen(8080, () => console.log('App listening on port 8080'));