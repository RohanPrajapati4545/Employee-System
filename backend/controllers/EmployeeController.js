const employeeSchema = require("./../model/employeeSchema")

const addEmp = async (req, res) => {
    try {
        const { empName, empEmail, empContact, empDepartment, empSallary } = req.body;

        const data = new employeeSchema({
            empName,
            empEmail,
            empContact,
            empDepartment,
            empSallary

        })
        const dataCreated = await data.save()
        res.status(201).json({ msg: "Employee added successfully", dataCreated })

    } catch (error) {

    }
}



const getAllEmployee = async (req, res) => {
    try {
        const data = await employeeSchema.find()
        if (data.length === 0) {
            return res.status(404).json({ msg: "no employee found" })
        }
        res.status(200).json({ msg: "employee found successfully", data })
    }

    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const { empName, empEmail, empContact, empDepartment, empSallary } = req.body;

        const employee = await employeeSchema.findByIdAndUpdate(
            id, { empName, empEmail, empContact, empDepartment, empSallary},
            { new: true }
        )
        if (!employee) {
            return res.status(404).json({ msg: "employee not found" })
        }

        employee.empName = empName,
            employee.empEmail = empEmail,
            employee.empContact = empContact,
            employee.empDepartment = empDepartment,
            employee.empSallary = empSallary,
          

        res.status(201).json({ msg: "updated successfully", employee })
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong" })
    }
}


const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params

        const employee = await employeeSchema.findById(id)
     

        await employeeSchema.findByIdAndDelete(id)
        res.status(201).json({ msg: "employee deleted successfully" })
        return
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong" })
    }
}

module.exports = { addEmp , getAllEmployee, updateEmployee, deleteEmployee}