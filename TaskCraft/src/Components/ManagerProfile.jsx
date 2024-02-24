import React, { useState, useEffect } from 'react';
import axios from 'axios';

const goToDashboard = () => {
  window.location.href = '/dashboard';
};

const ManagerProfile = () => {
  const [manager, setManager] = useState(null);
  const email = localStorage.getItem('man_email'); // Retrieve the email from localStorage

  useEffect(() => {
    const fetchManager = async () => {
      try {
        // Make an API call to your backend server to fetch the manager data
        const response = await axios.get(`http://localhost:3000/auth/managerprofile?email=${encodeURIComponent(email)}`);
        const { data } = response;
        if (data.Status) {
          setManager(data.Manager);
        } else {
          alert(data.Error);
        }
      } catch (error) {
        console.error('Error fetching manager profile:', error);
      }
    };

    fetchManager();
  }, [email]);

  return (
    <div className="manager-profile" style={{
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
      <h2 style={{ color: 'white' }}>Manager Profile</h2>
      {manager ? (
       <div style={{
        width: '75%',
        margin: '0 auto',
        border: '1px solid white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.2)',
        backgroundColor: 'black', // This will fill the div with black color
      }}>
 <table style={{ width: '100%', margin: '20px auto' }}>
            <tbody>
              <tr>
                <th>Manager ID</th>
                <td>{manager.mid}</td>
              </tr>
              <tr>
                <th>Manager Name</th>
                <td>{manager.mname}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{manager.email}</td>
              </tr>
              <tr>
                <th>Department Name</th>
                <td>{manager.dname}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No manager profile found.</p>
      )}
      <button
        onClick={goToDashboard}
        className="btn btn-primary btn-lg"
        style={{
          marginTop: '20px',
        }}
      >
        Go to Dashboard
      </button>
    </div>
    
  );

};

export default ManagerProfile;
