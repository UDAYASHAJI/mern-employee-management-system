var mongoose=require('mongoose')
const leaveschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    datestart:{
        type:Date,
        required :true,
    },
    dateend:{
        type:Date,
        required :true,
},
 leavetype: {
   type: String,
    enum: ['Vacation', 'Sick', 'Maternity', 'Others(Specify in Reason)'], 
    
      required: true
    },
reason:{
        type:String,
        required:true,
    }
})

const LeaveModel=mongoose.model("leave",leaveschema)
module.exports=LeaveModel