import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const EmployeeDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          }}
        >
          <div
            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
            style={{
              background:
                'radial-gradient(circle, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%)',
            }}
          >
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <span
                  className="fs-5 fw-bolder align-items-center d-none d-sm-inline"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Muhammad Tahir <br />
                  Muhammad Talha
                </span>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <br />
                  <li className="w-100">
                    <Link
                      to="/employeehome"
                      className="nav-link text-white px-0 align-middle"
                      style={{ fontSize: '1.1em' }} // Increase font size
                    >
                      <i className="fs-4 bi-speedometer2 ms-2"></i>
                      <span
                        className="ms-2 d-none d-sm-block"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Employee Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link
                      to="/employeedashboard/viewassigntask"
                      className="nav-link px-0 align-middle text-white"
                      style={{ fontSize: '1.2em' }} // Increase font size
                    >
                      <i className="fs-4 bi-people ms-2"></i>
                      <span
                        className="ms-2 d-none d-sm-block"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        View Task
                      </span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link
                      to="/employeedashboard/employeeprofile"
                      className="nav-link px-0 align-middle text-white"
                      style={{ fontSize: '1.2em' }} // Increase font size
                    >
                      <i className="fs-4 bi-person ms-2"></i>
                      <span
                        className="ms-2 d-none d-sm-block"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Employee's Profile
                      </span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link
                      to="/adminlogin"
                      className="nav-link px-0 align-middle text-white"
                      style={{ fontSize: '1.2em' }} // Increase font size
                    >
                      <i className="fs-4 bi-power ms-2"></i>
                      <span
                        className="ms-2 d-none d-sm-block"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Logout
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex align-items-center justify-content-center shadow">
            <h4>TaskCraft Pro</h4>
          </div>
          <div className="p-2 d-flex align-items-center justify-content-center shadow">
            <h5>Empower Your Workforce with Intelligent Task Management</h5>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="col p-0 m-0">
        <div className="p-2 d-flex align-items-center justify-content-center shadow">
          <h4>
            TaskCraft Pro <br />{' '}
          </h4>
        </div>
        <div className="p-2 d-flex align-items-center justify-content-center shadow">
          <h5>Empower Your Workforce with Intelligent Task Management </h5>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
