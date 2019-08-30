var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });

const { Schema } = mongoose;

//Define a schema
// var Schema = mongooseClient.Schema;

var UsersSchema = new Schema({
  username: String,
  password: String,
  email: String ,
  customer_id: String,
});

var userModel = mongoose.model('test', UsersSchema);
module.exports =  userModel;