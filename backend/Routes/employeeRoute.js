const express=require("express")
const router=express.Router()
const authMiddleware=require("../middlewares/authMiddleware")
const employeeController=require("../controllers/EmployeeController")

router.post("/add-employee",authMiddleware,employeeController.addEmp)
router.get("/get-employee",authMiddleware,employeeController.getAllEmployee)

router.put("/update-employee/:id",authMiddleware,(employeeController.updateEmployee))
router.delete("/delete-employee/:id",authMiddleware,(employeeController.deleteEmployee))


module.exports=router