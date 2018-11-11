//Package Imports
var https = require("https");
var fs = require("fs");
var github = require("octonode");

//Modal Imports
var User = require('../model/user.js');

//Exports
var exports = module.exports = {};

//---------------GET Default---------------//
exports.getDefault = function(request, response){
    // var intResult = 0;
    // var stringResult = "";
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

}
    // var options = {
    //     hostname: 'api.github.com',
    //     port: 443,
    //     path: '/repos/kilroyda/Github_REST_Access/git/commits',
    //     method: 'GET',
    //     message: 'arbitrary',
    //     headers: {
    //         'User-Agent': 'Awesome-Octocat-App'
    //     }
    //
    // };
    //
    // var responseString = "";
    // var req = https.request(options, function (res) {
    //     console.log('statusCode: ', res.statusCode);
    //     console.log('headers: ', res.headers);
    //
    //     res.on('data', function (data) {
    //         console.log(responseString += data);
    //     });
    //     res.on("end", function () {
    //         console.log(responseString);
    //     });
    // });
    //
    // req.end();
    // req.on('error', (e) => {
    //     console.error(e);
    // });
    // return responseString;


exports.sayHello = function(){
    return 'hello';
};
