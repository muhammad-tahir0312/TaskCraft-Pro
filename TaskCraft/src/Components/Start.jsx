import React from 'react';

const Start = () => {
  const goToLogin = () => {
    window.location.href = '/adminlogin';
  };

  return (
    <div style={{
      background: 'radial-gradient(circle, lightblue, black)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <br /> <br />
      <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to TaskCraft Pro</h1>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <div style={{ border: '1px solid white', padding: '20px', borderRadius: '5px' }}>
          <p style={{ fontSize: '1.2em' }}>
            TaskCraft Pro is a web-based application that allows organization to create and manage their tasks. The application provides a clean and intuitive user interface, making it easy for users to add, edit, and delete tasks.
          </p>
        </div>
      </div>
      <button onClick={goToLogin} style={{
        padding: '10px 20px',
        fontSize: '1em',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px',
        backgroundColor: 'darkblue',
        color: 'white'
      }}>Proceed to Login</button>
      
          <div style={{
            width: '50%',
            textAlign: 'center',
          }}> <br /> <br /><br />
            <p style={{ fontSize: '1.2em' }}>
              We dedicate this project to our respected teacher,
            </p>   
            <p style={{ fontSize: '1.2em' }}>
             Ma'am Nida Munawar.
            </p>  
          </div>{/* Footer Section */}
          <footer style={{
        width: '100%',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        marginTop: '40px' // Added margin to push the footer down
      }}>
        <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>FAQ & Online Help</h2>
        {/* <div style={{ marginBottom: '10px' }}>
          <h3 style={{ fontSize: '1.2em' }}>Frequently Asked Questions</h3>
          <p>Find answers to common questions about TaskCraft Pro in our FAQ section.</p>
        </div> */}
        <div>
          <h3 style={{ fontSize: '1.2em' }}>Contact Us</h3>
          <p>Need help? Reach out to our support team at:</p>
          <p>Email: support@taskcraftpro.com</p>
          <p>Phone: +1 (800) 123-4567</p>
        </div>
      </footer>
    </div>
  );
};

export default Start;