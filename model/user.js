var mongoose = require('mongoose');

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: {type: String, required: true},
    id: {type: Number, required: true, unique: true},
    repo_count: {type: Number, required: true},
    followers: {type: Number, required: true},
    following: {type: Number, required: true},
    repos_url: {type: String, required: true}
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
