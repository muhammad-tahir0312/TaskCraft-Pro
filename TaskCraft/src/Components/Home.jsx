import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records').then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count').then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count').then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count').then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleDeleteAdmin = (admin) => {
    axios
      .delete(`http://localhost:3000/auth/admin/${admin.id}`)
      .then((result) => {
        if (result.data.Status) {
          setAdmins(admins.filter((a) => a.id !== admin.id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
      {/* Sidebar */}
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' }}>
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{ background: 'radial-gradient(circle, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%)' }}>
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <span className="fs-5 fw-bolder align-items-center d-none d-sm-inline" style={{ whiteSpace: 'nowrap' }}>
                  Muhammad Tahir <br />
                  Muhammad Talha
                </span>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="w-100">
              <Link
                to="/home"
                className="nav-link text-white px-0 align-middle"
              >
                <i className="fs-4 bi-speedometer2 ms-2"></i>
                <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}>Manager Dashboard</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/employee"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="fs-4 bi-people ms-2"></i>
                <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}> Manage Employees</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/task"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="fs-4 bi-columns ms-2"></i>
                <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}> Manage Task</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/project"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="fs-4 bi-columns ms-2"></i>
                <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}> Manage Projects</span>
              </Link> 
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/assigntask"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="fs-4 bi-columns ms-2"></i>
                <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}> Assign Task</span>
              </Link> 
            </li>
            <li className="w-100">
                <Link
                  to="/dashboard/approvetask"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-block"  style={{whiteSpace: 'nowrap'}}> Approve Task</span>
                </Link>       
              </li>
            <li className="w-100">
              <Link
                to="/dashboard/managerprofile"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="fs-4 bi-person ms-2"></i>
                <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}>Manager's Profile</span>
              </Link>
            </li>
            <li className="w-100" >
              <Link
                  to="/adminlogin"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-block" style={{whiteSpace: 'nowrap'}}>Logout</span>
                </Link>
              </li>
          </ul>
        </div>
      </div>
      </div>
      </div>     
    
      <div className="col-md-9 ms-sm-auto col-lg-9 px-4" style={{backgroundColor: '#f8f9fa'}}>
    <div className="p-3 d-flex justify-content-around mt-3">
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px'}}>
            <div className='text-center pb-1'>
                <h4>Admin</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{adminTotal}</h5>
            </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px'}}>
            <div className='text-center pb-1'>
                <h4>Employee</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>{employeeTotal}</h5>
            </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25' style={{backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px'}}>
            <div className='text-center pb-1'>
                <h4>Salary</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5>${salaryTotal}</h5>
            </div>
        </div>
    </div>

        <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table " style={{borderCollapse: 'separate', borderSpacing: '0 15px'}}>
        <thead>
        <tr>
          <th style={{ borderBottom: '3px solid #343a40' }}>Email</th>
        </tr>
        </thead>
        <tbody>
        {admins.map((a) => (
          <tr key={a.id} style={{backgroundColor: '#e9ecef', borderRadius: '15px'}}>
            <td >{a.email}</td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );

};

export default Home;
