const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const informationSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  street_one: {
    type: String,
  },
  street_two: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  state:{
    type:String
  },
  county: {
    type: String,
  },
  country: {
    type: String,
  },dob: {
    type: String,
  },
  pob: {
    type: String,
  },
  sex: {
    type: String,
  },
  race: {
    type: String,
  },
  ethincity: {
    type: String,
  },
  eye_color: {
    type: String,
  },
  hair_color: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  heighft: {
    type: String,
  },
  heightin: {
    type: String,
  },
  weight: {
    type: String,
  },
  ice: {
    type: String,
  },
  ssn: {
    type: String,
  },
  permitname: {
    type: String,
  },
  permitexpir: {
    type: String,
  },
  dlnumber: {
    type: String,
  },
  dlnumberexpir:{
    type:String
  },
  state: {
    type: String,
  },
  policeid: {
    type: String,
  },
  policename: {
    type: String,
  } 
});

const myDB = mongoose.connection.useDb('informationDb');
module.exports = myDB.model('Information', informationSchema,'information');
