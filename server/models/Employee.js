const mongoose = require('mongoose')
const {Schema} = mongoose ;

const EmployeeSchema = new Schema({

    employeeName:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    netSalary:{
        type:Number,
        required:true
    },
    salaryStatus:{
        type:String,
        enum:["Paid" , "Pending"],
        required:true
    }
})

const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = Employee;
