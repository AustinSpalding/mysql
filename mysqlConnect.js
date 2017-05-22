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
			connection.query('SELECT * FROM boxSubscriptions', function(err, results) {
				if (err) throw err;
				console.log('Row pulled...');
				console.log(results[0].id);
				console.log(results[0].name);
				console.log(results[0].subscribers);
				console.log(results[0].price);
			});
		});
	});
});
