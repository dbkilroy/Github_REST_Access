var busboyBodyParser = require('busboy-body-parser');
var express = require('express');
var ejs = require('ejs');
var app = express();

app.use(busboyBodyParser({ limit: '10mb' }));


app.get('/',function(req,res){
  res.sendFile('graph/index.html', { root: __dirname });
});

app.get('/graph.js',function(req,res){
  res.sendFile('graph/graph.js', { root: __dirname });
});

app.get('/bundle.js',function(req,res){
  res.sendFile('graph/bundle.js', { root: __dirname });
});

app.listen(3001, function() {
    console.log("We're on port 3001 too boss!");
});
