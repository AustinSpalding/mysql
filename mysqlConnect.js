var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'pass',
	database: 'testDatabase'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connection made...');
	connection.query('CREATE TABLE boxSubscriptions(id int primary key NOT NULL auto_increment, name varchar(255), subscribers int, price float)', function(err, result) {
		if (err) throw err;
		console.log('Table made...');
		connection.query('INSERT INTO boxSubscriptions (name, subscribers, price) VALUES ("TestBox", 1000, 14.99)', function(err, result) {
			if (err) throw err;
			console.log('Row inserted...');
		});
		connection.query('INSERT INTO boxSubscriptions (name, subscribers, price) VALUES ("Test2", 70, 12.50)', function(err, result) {
			if (err) throw err;
			console.log('Row2 inserted...');
		});
	});
});

app.set('port', 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.get('/', function(req, res) {
	connection.query('SELECT * FROM boxSubscriptions', function(err, rows) {
		res.render('index', {boxSubs : rows});
	});
});

app.listen(app.get('port'));