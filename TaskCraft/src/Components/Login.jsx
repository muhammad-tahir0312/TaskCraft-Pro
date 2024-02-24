import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    designation: ''
  });

  const [error, setError] = useState(null);
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!checkBoxChecked) {
      setError("Please agree to the terms and conditions");
      return;
    }
    axios
      .post('http://localhost:3000/auth/adminlogin', values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          localStorage.setItem("emp_email",result.data.email);
          localStorage.setItem("man_email",result.data.email);
          localStorage.setItem("password",result.data.password);
          localStorage.setItem("designation",result.data.designation);
              
          navigate(result.data.designation === 'Manager' ? '/home' : '/employeehome');

        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-warning'>{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email:</strong>
            </label>
            <input
              type='email'
              name='email'
              autoComplete='off'
              placeholder='Enter Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password:</strong>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Designation'>
              <strong>Designation:</strong>
            </label>
            <select
              name='Designation'
              onChange={(e) => setValues({ ...values, designation: e.target.value })}
              className='form-control rounded-0'
            >
              <option value=''>Select Designation</option>
              <option value='Employee'>Employee</option>
              <option value='Manager'>Manager</option>
            </select>
          </div>
          <div className='mb-1'>
            <input
              type='checkbox'
              name='tick'
              id='tick'
              className='me-2'
              checked={checkBoxChecked}
              onChange={() => setCheckBoxChecked(!checkBoxChecked)}
            />
            <label htmlFor='password'>You agree with the terms & conditions</label>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
