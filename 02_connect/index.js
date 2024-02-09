var mysql = require('mysql');
const { faker } = require('@faker-js/faker');

app.set('view engine', 'ejs');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'test'
});

connection.connect(function(err) {
    if(err) {
        console.error('Error Connecting: ', err.stack);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
});
// STatic Approach
/*
var q = 'INSERT INTO users (email) VALUES ("rustydog@gmail.com")';

connection.query(q, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
*/

// Dynamic Approach
/*
var person = {
    email: faker.internet.email(),
    created_at: faker.date.past()
};

var endResult = connection.query('INSERT INTO users SET ? ', person, function(err, result) {
    if (err) throw err;
    console.log(result);
})
*/

// Inserting many data 
var data = [];
for (var i=0; i<500; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], function(err, result) {
    console.log(err);
    console.log(result);
});

connection.end();

/*
var q = 'SELECT * FROM users';

connection.query(q, function(error, results, fields) {
    if(error) 
        throw error;
    results.forEach(result => {
        console.log(result);
    })
});
*/