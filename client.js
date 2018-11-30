var busboyBodyParser = require('busboy-body-parser');
var express = require('express');
var ejs = require('ejs');
var app = express();

app.use(busboyBodyParser({ limit: '10mb' }));

app.set('view engine', 'ejs');
app.use('/', function(req, res) {
    res.render('index');
});

app.listen(3001, function() {
    console.log("We're on port 3001 too boss!");
});
