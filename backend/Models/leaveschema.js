const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    datestart: {
        type: Date,
        required: true
    },
    dateend: {
        type: Date,
        required: true
    },
    leavetype: {
        type: String,
        enum: ['Vacation', 'Sick', 'Maternity', 'Others(Specify in Reason)'],
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    approval: {
        type: String,
        enum: ['Pending', 'Approved'],
        default: 'Pending' 
    }
}, { timestamps: true }); 

const LeaveModel = mongoose.model("leave", leaveSchema);
module.exports = LeaveModel;
