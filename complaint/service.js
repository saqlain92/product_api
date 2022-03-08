// const Complaint = require('./model');
// const { ErrorHandler} = require('../helpers/error');

// async function createComplaint(req){

//     if(req.body && req.body.message ){
//         const complaint = new Complaint({
//             product : req.params.id,
//             message : req.body.message,
//             status  : "pending",
//             complainterName : req.user.email
//         });
//         return await complaint.save();        
//     }
//     else throw new ErrorHandler("200","false","wrong password");

// }

// async function getComplaints(req){
//     console.log("in get complaints");
//     const complaints = await Complaint.find().populate({path : 'product' ,match : {city : req.user.city }});
//     return complaints;
// }

// async function adminComplaints(req){
//    // return await Complaint.populate({"product.city" : "req.user.city"});
//     return await Complaint.populate({product});
// }

// async function updateStatus(req){
//     const complaint = Complaint.findByIdAndUpdate(req.body.id, {status : req.params.status});
//     return await complaint;
// }

// module.exports = {
//     createComplaint,
//     getComplaints,
//     updateStatus,
//     adminComplaints
// }