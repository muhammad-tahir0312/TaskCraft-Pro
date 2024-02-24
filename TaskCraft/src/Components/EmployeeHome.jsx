import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeHome = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [rating, setRating] = useState(0);
  const email = localStorage.getItem('emp_email');

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/employee_rating?email=${encodeURIComponent(email)}`);
        setRating(response.data.Result.rating);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [email]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const taskResponse = await axios.get(`http://localhost:3000/auth/employee_tasks?email=${encodeURIComponent(email)}`);
        const taskData = taskResponse.data;
        if (taskData.Status) {
          setTasks(taskData.Result);
          setTaskCount(taskData.Result.length);
        } else {
          alert(taskData.Error);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [email]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{ background: 'radial-gradient(circle, rgba(9,9,121,1) 35%, rgba(0,0,0,1) 100%)' }}>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <span className="fs-5 fw-bolder align-items-center d-none d-sm-inline" style={{ whiteSpace: 'nowrap' }}>
                    Muhammad Tahir <br />
                    Muhammad Talha
                  </span>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li className="w-100">
                    <Link to="/employeehome" className="nav-link text-white px-0 align-middle" style={{ fontSize: '1.1em' }}>
                      <i className="fs-4 bi-speedometer2 ms-2"></i>
                      <span className="ms-2 d-none d-sm-block" style={{ whiteSpace: 'nowrap' }}>Employee Dashboard</span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/employeedashboard/viewassigntask" className="nav-link px-0 align-middle text-white" style={{ fontSize: '1.2em' }}>
                      <i className="fs-4 bi-people ms-2"></i>
                      <span className="ms-2 d-none d-sm-block" style={{ whiteSpace: 'nowrap' }}>View Task</span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/employeedashboard/employeeprofile" className="nav-link px-0 align-middle text-white" style={{ fontSize: '1.2em' }}>
                      <i className="fs-4 bi-person ms-2"></i>
                      <span className="ms-2 d-none d-sm-block" style={{ whiteSpace: 'nowrap' }}>Employee's Profile</span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link to="/adminlogin" className="nav-link px-0 align-middle text-white" style={{ fontSize: '1.2em' }}>
                      <i className="fs-4 bi-power ms-2"></i>
                      <span className="ms-2 d-none d-sm-block" style={{ whiteSpace: 'nowrap' }}>Logout</span>
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
          <div className="mt-4 px-5 pt-3">
          
          <div className="d-flex justify-content-center">

          <div className='px-3 pt-2 pb-3 border shadow-sm' style={{backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px', width: '25%', marginRight: '80px'}}>
            <div className='text-center pb-1'>
              <h4>Employee</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total Assigned Tasks:</h5>
              <h5>{taskCount}</h5>
            </div>
          </div>

          <div className='px-3 pt-2 pb-3 border shadow-sm' style={{backgroundColor: '#343a40', color: '#ffffff', borderRadius: '15px', width: '25%', marginLeft: '40px'}}>
              <div className='text-center pb-1'>
                <h4>Rating</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-center'>
                <h5>{rating ? rating.toFixed(2) : 'N/A'}</h5> {/* Conditional rendering */}
              </div>
            </div>
        </div>
           {/* Task List */}
              <div className="mt-4 px-5 pt-3">
                <h3>Task List</h3>
                <table className="table" style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
  <thead>
    <tr>
      <th style={{ borderBottom: '3px solid #343a40' }}>Assigned By Manager</th>
      <th style={{ borderBottom: '3px solid #343a40' }}>Due Date</th>
      <th style={{ borderBottom: '3px solid #343a40' }}>Bonus Point</th>
      <th style={{ borderBottom: '3px solid #343a40' }}>Approval Status</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map((task) => (
      <tr key={task.assignment_id} style={{ backgroundColor: '#e9ecef', borderRadius: '15px' }}>
        <td>{task.mname}</td>
        <td>{formatDate(task.dueDate)}</td>
        <td>{task.bonusPoint}</td>
        <td>{task.approvalStatus}</td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EmployeeHome;
