var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });

const { Schema } = mongoose;

//Define a schema
// var Schema = mongooseClient.Schema;

var cardsSchema = new Schema({
  customer_id: String,
  country: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipcode: String
});

var cardModel = mongoose.model('card', cardsSchema);
module.exports =  cardModel;