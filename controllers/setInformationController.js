const Dealership = require('../models/dealerships');
const setDealerships = async(req,res,next) => {
    const dealership = new Dealership(req.body);
    const data =  await dealership.save();
    res.send ({status:200,success:true, body: data})
}

const editDealership = async(req,res,next) => {
    const updatedData = JSON.parse(JSON.stringify(req.body));
    delete updatedData._id;
    const updated = await Dealership.update({_id: req.body._id}, updatedData);
    if (updated){
        res.send ({status:200,success:true, body: req.body})
    } else {
        res.send ({status:400,success:false})
    }
}

module.exports = {
    setDealerships,
    editDealership
};
