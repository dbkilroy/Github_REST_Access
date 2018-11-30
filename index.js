//Package Imports
var busboyBodyParser = require('busboy-body-parser');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var https = require('https');
var express = require('express');
var fs = require('fs');
var github = require('octonode');
var ejs = require('ejs');
//Modal Imports
var User = require('./model/user.js');

//Script Defintions
var app = express();
var port = process.env.PORT || 3000;
var APIRouter = express.Router();

//Exports
//var exports = module.exports = {};

//Connecting to Database
mongoose.connect('mongodb://localhost:27017/test', {
    useCreateIndex: true,
    useNewUrlParser: true
 });
app.use(busboyBodyParser({ limit: '10mb' }));

//---------------GET Requests---------------//

    // var resultArray = [];
    // mongo.connect(url, function(err, db){
    //     assert.equal(null, err);
    //     var cursor = db.collection('users').find();
    //     cursor.forEach( function(doc, err) {
    //         assert.equal(null, err);
    //         resultArray.push(doc);
    //     }, function() {
    //         db.close();
    //         res.send(resultArray);
    //     });
    // });






//---------------API Routes---------------//
APIRouter.get('/test',  function(request, response) {

    var client = github.client();
    client.get("/users/psunkara", {}, function(err, status, body, headers) {
        console.log(body);
        if(err) return response.set(500).send(err);
        if(!body) return response.set(404).send("'error':'User not found'");
        return response.set(200).send(JSON.stringify(body));
        //console.log("Status= " + status);
        //intResult += status;
        //var bodyText = JSON.stringify(body);
        //console.log(bodyText);
        //var stringResult = stringResult.concat(bodyText);
        //console.log(stringResult);
        //console.log("Headers= " + JSON.stringify(headers));
        //console.log("Body= " + bodyText);
    });
});

APIRouter.get('/user/:username', function(request, response){
    var client = github.client();
    client.get("/users/" + request.params.username, {}, function(err, status, body, headers) {
        if(err) return response.set(500).send(err);
        if(!body) return response.set(404).send("'error':'User not found'");
        var user = new User();
        user.login = body.login;
        user.id = body.id;
        user.followers = body.followers;
        user.following = body.following;
        user.repo_count = body.public_repos;
        user.repos_url = body.repos_url;
        user.save(function(err, user) {
            if(err) return response.set(500).send(err);
            return response.set(201).send(
                {
                    success: "User added!",
                    user: user
                }
            );
        });
    });
});

// APIRouter.get('/repos/:username', function(request, response){
//
//     if (myDocument) {
//         var url = JSON.stringify(myDocument.repos_url);
//         var client = github.client();
//         client.get("/users/" + request.params.username + "/repos", {}, function(err, status, body, headers) {
//
//
//         });
//     }
//     user.save(function(err, user) {
//         if(err) return response.set(500).send(err);
//         return response.set(201).send(
//             {
//                 success: "User added!",
//                 user: user
//             }
//         );
//     });
// });

exports.sayHello = function(){
    return 'hello';
};


app.use('/api', APIRouter);
app.listen(port, function(){
  console.log("Listening on port " + port);
});
