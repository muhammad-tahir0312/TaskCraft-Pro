import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const goToDashboard = () => {
  window.location.href ='/dashboard';
};

const Employee = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/view_employee')
      .then(result => {
        if(result.data.Status) {
          setEmployees(result.data.employees)
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 


  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>EID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Job</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Salary</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.eid}>
              <td>{employee.eid}</td>
              <td>{employee.ename}</td>
              <td>{employee.dname}</td>
              <td>{employee.jtitle}</td>
              <td>{employee.email}</td>
              <td>{employee.rating}</td>
              <td>{employee.salary}</td>
              <td>{employee.password}</td>
              <td>
                  <Link
                    to={`/dashboard/edit_employee/` + employee.eid}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(employee.eid)}
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
          <Link to="/dashboard/add_employee" className="btn btn-success">
            Add Employee
          </Link>
      <button
      onClick={goToDashboard}
      className="btn btn-primary btn-lg"
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
      }}
      >
        Go to Dashboard
     </button>
    </div>
  )
}

export default Employee