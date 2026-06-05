import React, { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AddEmployee = ({ onAdded }) => {
    const token = useSelector((state) => state.auth.token)

    const [empName, setEmpName] = useState("")
    const [empEmail, setEmpEmail] = useState("")
    const [empContact, setEmpContact] = useState("")
    const [empDepartment, setEmpDepartment] = useState("")
    const [empSallary, setEmpSallary] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post(
                "http://localhost:5000/api/employee/add-employee",
                {
                    empName,
                    empEmail,
                    empContact,
                    empDepartment,
                    empSallary
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setEmpName("")
            setEmpEmail("")
            setEmpContact("")
            setEmpDepartment("")
            setEmpSallary("")

            if (onAdded) onAdded()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h3 className="mb-3 text-center">Add Employee</h3>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input
                                className="form-control"
                                placeholder="Name"
                                value={empName}
                                onChange={(e) => setEmpName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                className="form-control"
                                placeholder="Email"
                                value={empEmail}
                                onChange={(e) => setEmpEmail(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                className="form-control"
                                placeholder="Contact"
                                value={empContact}
                                onChange={(e) => setEmpContact(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <input
                                className="form-control"
                                placeholder="Department"
                                value={empDepartment}
                                onChange={(e) => setEmpDepartment(e.target.value)}
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <input
                                className="form-control"
                                placeholder="Salary"
                                value={empSallary}
                                onChange={(e) => setEmpSallary(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary w-100" type="submit" onClick={()=>navigate('/home')}>
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee