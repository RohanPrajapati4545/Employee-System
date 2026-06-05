import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const token = useSelector((state) => state.auth.token)

    const [showModal, setShowModal] = useState(false)
    const [editId, setEditId] = useState(null)
const navigate=useNavigate()
    const [form, setForm] = useState({
        empName: "",
        empEmail: "",
        empContact: "",
        empDepartment: "",
        empSallary: ""
    })

    const getEmployees = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/employee/get-employee",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setEmployees(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/employee/delete-employee/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setEmployees(employees.filter((emp) => emp._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const openEditModal = (emp) => {
        setEditId(emp._id)
        setForm(emp)
        setShowModal(true)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const updateEmployee = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/employee/update-employee/${editId}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setShowModal(false)
            getEmployees()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-4">

            <h3 className="mb-3">Employee List</h3>

            <div className="card shadow">
                <div className="mx-auto ">
                    <button onClick={()=>navigate("/add-employee")}className="btn btn-success" >Add Employee</button>
                </div>
                <div className="card-body">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp._id}>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empEmail}</td>
                                    <td>{emp.empContact}</td>
                                    <td>{emp.empDepartment}</td>
                                    <td>{emp.empSallary}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => openEditModal(emp)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteEmployee(emp._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

          
            {showModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Update Employee</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <input
                                    className="form-control mb-2"
                                    name="empName"
                                    value={form.empName}
                                    onChange={handleChange}
                                    placeholder="Name"
                                />

                                <input
                                    className="form-control mb-2"
                                    name="empEmail"
                                    value={form.empEmail}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />

                                <input
                                    className="form-control mb-2"
                                    name="empContact"
                                    value={form.empContact}
                                    onChange={handleChange}
                                    placeholder="Contact"
                                />

                                <input
                                    className="form-control mb-2"
                                    name="empDepartment"
                                    value={form.empDepartment}
                                    onChange={handleChange}
                                    placeholder="Department"
                                />

                                <input
                                    className="form-control mb-2"
                                    name="empSallary"
                                    value={form.empSallary}
                                    onChange={handleChange}
                                    placeholder="Salary"
                                />
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>

                                <button className="btn btn-primary" onClick={updateEmployee}>
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmployeeList