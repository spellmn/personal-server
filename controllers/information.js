const Ethnicity = require('../models/dealerships');
const Information = require('../models/information');


const saveData = async(req,res,next) => {
    const information = new Information({
      first_name:req.body.fname,
      last_name:req.body.lname,
      middle_name:req.body.mname,
      street_one:req.body.street1,
      street_two:req.body.street2,
      city:req.body.city,
      zip:req.body.zip,
      state:req.body.state1,
      county:req.body.county,
      country:req.body.country,
      dob:req.body.dob,
      pob:req.body.pob,
      sex:req.body.sex,
      race:req.body.race,
      ethincity:req.body.ethincity,
      eye_color:req.body.ecolor,
      hair_color:req.body.hcolor,
      citizenship:req.body.citizenship,
      heighft:req.body.heighft,
      heightin:req.body.heightin,
      weight:req.body.weight,
      ice:req.body.ice,
      ssn:req.body.ssn,
      permitname:req.body.permitname,
      permitexpir:req.body.permitexpir,
      dlnumber:req.body.dlnumber,
      dlnumberexpir:req.body.dlnumberexpir,
      state:req.body.state,
      policeid:req.body.policeid,
      policename:req.body.policename
    });
    await information.save();

    res.send ({status:200,success:true})
},
 dataSeeder = async(req,res,next) => {
  const state = new State({
    shortName:"NZ",
    longName:"Newzland",
    sequence:"0",
    abbr:"Wash"
  });
  await state.save();

  const country = new Country({
    shortName:"Albania",
    longName:"Albania",
    sequence:"1",
    abbr:"Wash"
  });
  await country.save();
  
  const eyecolor  = new Eyecolor ({
    shortName:"Blue",
    longName:"Blue",
    sequence:"2",
    abbr:""
  });
  await eyecolor.save();
  
  const gender = new Gender({
    shortName:"FEMALE",
    longName:"FEMALE",
    sequence:"0",
    abbr:"Wash"
  });
  await gender.save();
  
  const haiercolor = new Haircolor({
    shortName:"BLACK",
    longName:"BLACK",
    sequence:"0",
    abbr:"Wash"
  });
  await haiercolor.save();


  const race = new Race({
    shortName:"Black or African American",
    longName:" Black or African American",
    sequence:"0",
    abbr:"Wash"
  });
  await race.save();

  const ethnicity = new Ethnicity({
    shortName:"Black or African American",
    longName:" Black or African American",
    sequence:"0",
    abbr:"Wash"
  });
  await ethnicity.save();


  res.send ({status:200,success:true})
}

 module.exports = {
  saveData,
  dataSeeder
 };
