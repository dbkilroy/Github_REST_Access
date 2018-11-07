var https = require("https");
var fs = require("fs");
var exports = module.exports = {};

exports.getDefault = function(){

    var options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/repos/kilroyda/Github_REST_Access/git/commits',
        method: 'GET',
        message: 'arbitrary',
        headers: {
            'User-Agent': 'Awesome-Octocat-App'
        }

    };

    var responseString = "";
    var req = https.request(options, function (res) {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);

        res.on('data', function (data) {
            console.log(responseString += data);
        });
        res.on("end", function () {
            console.log(responseString);
        });
    });

    req.end();
    req.on('error', (e) => {
        console.error(e);
    });
    return responseString;
}

exports.sayHello = function(){
    return 'hello';
};
