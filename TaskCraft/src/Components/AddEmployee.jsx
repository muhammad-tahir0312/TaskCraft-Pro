import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    ename: "",
    did: "",
    jid: "",
    email: "",
    rating: 0,
    salary: 0,
    password: ""
  });

  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/view_job')
      .then(result => {
        if (result.data.Status) {
          setJobs(result.data.Tasks);
        } else {
          console.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3000/auth/view_departments')
      .then(result => {
        if (result.data.Status) {
          setDepartments(result.data.Tasks);
        } else {
          console.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleJobChange = (e) => {
    setEmployee({ ...employee, jid: e.target.value });
  }

  const handleDepartmentChange = (e) => {
    setEmployee({ ...employee, did: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_employee', employee)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/Employee');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputname" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputname"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, ename: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputdid" className="form-label">
              Department
            </label>
            <select
              className="form-control rounded-0"
              id="inputdid"
              onChange={handleDepartmentChange}
              value={employee.did}
            >
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department.did} value={department.did}>
                  {department.dname}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputjid" className="form-label">
              Job Title
            </label>
            <select
              className="form-control rounded-0"
              id="inputjid"
              onChange={handleJobChange}
              value={employee.jid}
            >
              <option value="">Select Job</option>
              {jobs.map(job => (
                <option key={job.jid} value={job.jid}>
                  {job.jtitle}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputemail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputemail"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputrating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputrating"
              name="rating"
              onChange={(e) => setEmployee({ ...employee, rating: e.target.value })}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputsalary">
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputsalary"
              name="salary"
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputpass" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputpass"
              placeholder="Enter Password"
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
