const mongoose=require("mongoose")
const employeeSchema=new mongoose.Schema({
    empName:{
        type:String,
        require: true
    }, 
    empEmail:{
        type:String,
        require: true
    },
    empContact:{
        type:String,
        require: true
    },
    empDepartment:{
        type:String,
        require: true
    },
    empSallary:{
        type:String,
       require:true
    }
})
const Employee=new mongoose.model("Employee", employeeSchema)
module.exports=Employee