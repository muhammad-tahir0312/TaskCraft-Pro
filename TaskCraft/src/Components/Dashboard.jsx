import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  }
  return (
    <div className="container-fluid" >
      <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}}>
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{background: 'radial-gradient(circle, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%)'}}>
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <span className="fs-5 fw-bolder align-items-center d-none d-sm-inline"  style={{whiteSpace: 'nowrap'}}>
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
                  <span className="ms-2 d-none d-sm-inline"  style={{whiteSpace: 'nowrap'}}>Manager Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"  style={{whiteSpace: 'nowrap'}}> Manage Employees</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/task"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-block"  style={{whiteSpace: 'nowrap'}}> Manage Task</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/project"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"  style={{whiteSpace: 'nowrap'}}> Manage Projects</span>
                </Link> 
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/assigntask"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-block"  style={{whiteSpace: 'nowrap'}}> Assign Task</span>
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
                  <span className="ms-2 d-none d-sm-inline"  style={{whiteSpace: 'nowrap'}}>Manager's Profile</span>
                </Link>
              </li>
              <li className="w-100" >
                <Link
                    to="/adminlogin"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-power ms-2"></i>
                    <span className="ms-2 d-none d-sm-block"  style={{whiteSpace: 'nowrap'}}>Logout</span>
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex align-items-center justify-content-center shadow" >
                <h4>TaskCraft Pro <br /> </h4>
            </div>
            <div className="p-2 d-flex align-items-center justify-content-center shadow" >
                <h5>Empower Your Workforce with Intelligent Task Management </h5>
            </div>
            <Outlet /> 
    </div>
    </div>
    </div>
  );
};

export default Dashboard;