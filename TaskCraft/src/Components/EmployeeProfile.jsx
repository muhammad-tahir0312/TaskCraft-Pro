import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeProfile.css'; 

const goToDashboard = () => {
  window.location.href ='/employeedashboard';
};

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const email = localStorage.getItem('emp_email'); // Retrieve the email from localStorage

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/employeeprofile?email=${encodeURIComponent(email)}`);
        const { data } = response;
        if (data.Status) {
          setEmployee(data.Employee);
        } else {
          alert(data.Error);
        }
      } catch (error) {
        console.error('Error fetching employee profile:', error);
      }
    };

    fetchEmployee();
  }, [email]);

  return (
    <div className="employee-profile" style={{
      width: '100%',
      margin: '0 auto',
      textAlign: 'center',
      padding: '20px',
      background: "linear-gradient(rgba(11, 11, 11, 0.5), rgba(10, 10, 10, 0.5)), url('/images/OIG.jpeg')",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 120%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <h2 style={{ color: 'white' }}>Employee Profile</h2>
      {employee ? (
        <div style={{
          width: '75%',
          margin: '0 auto',
          border: '1px solid white',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.2)',
          backgroundColor: 'black', // This will fill the div with black color
        }}>
          <table style={{ width: '100%', margin: '20px auto'}}>
            <tbody>
              <tr>
                <th style={{ border: '1px solid white' }}>Employee ID</th>
                <td style={{ border: '1px solid white' }}>{employee.eid}</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid white' }}>Employee Name</th>
                <td style={{ border: '1px solid white' }}>{employee.ename}</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid white' }}>Email</th>
                <td style={{ border: '1px solid white' }}>{employee.email}</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid white' }}>Department Name</th>
                <td style={{ border: '1px solid white' }}>{employee.dname}</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid white' }}>Job Title</th>
                <td style={{ border: '1px solid white' }}>{employee.jtitle}</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid white' }}>Rating</th>
                <td style={{ border: '1px solid white' }}>{employee.rating}</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid white' }}>Salary</th>
                <td style={{ border: '1px solid white' }}>{employee.salary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No employee profile found.</p>
      )}
      <button
        onClick={goToDashboard}
        style={{
          padding: '15px 30px',
          fontSize: '1.15em',
          borderRadius: '5px',
          border: '1px solid white',
          cursor: 'pointer',
          marginTop: '20px',
          backgroundColor: 'darkblue',
          color: 'white',
        }}
      >
        Go to Dashboard
      </button>
    </div>
    
        );
};

export default EmployeeProfile;
