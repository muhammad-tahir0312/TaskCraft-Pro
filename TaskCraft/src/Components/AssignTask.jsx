import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AssignTask.css';

const AssignTask = () => {
  const man_email = localStorage.getItem('man_email');  
  // State declarations
  const [tid, setTid] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [eid, setEid] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch tasks and employees on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksResult = await axios.get('http://localhost:3000/auth/view_tasks');
        if (tasksResult.data.Status) {
          setTasks(tasksResult.data.tasks);
        } else {
          setError(tasksResult.data.Error);
        }
      } catch (err) {
        setError('An error occurred while fetching tasks.');
      }
    };

    const fetchEmployees = async () => {
      try {
        const employeesResult = await axios.get('http://localhost:3000/auth/view_employee');
        if (employeesResult.data.Status) {
          setEmployees(employeesResult.data.employees);
        } else {
          setError(employeesResult.data.Error);
        }
      } catch (err) {
        setError('An error occurred while fetching employees.');
      }
    };

    const fetchManagerId = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/auth/get_manager_id?man_email=${man_email}`);
        if (result.data.Status) {
          setAssignedBy(result.data.managerId);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        setError('An error occurred while fetching the manager\'s ID.');
      }
    };

    fetchTasks();
    fetchEmployees();
    fetchManagerId();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/auth/assign_task', {
        tid,
        startDate,
        dueDate,
        eid,
        assignedBy
      });
      if (result.data.Status) {
        navigate('/dashboard');
      } else {
        setError(result.data.Error);
      }
    } catch (err) {
      setError('An error occurred while submitting the task.');
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100 loginPage'>
      <div className='p-3 rounded w-60 border d-flex flex-wrap justify-content-center' style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid white'
      }}>
        <div className='heading-div'>
          <h2><strong>Assign Task</strong></h2>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Employee dropdown */}
          <div className='mb-3'>
            <label htmlFor="eid"><strong>Employee:</strong></label>
            <select
              className='form-control rounded-0'
              name='eid'
              onChange={(e) => setEid(e.target.value)}
              value={eid}
            >
              <option value=''>Select Employee</option>
              {employees.map(employee => (
                <option key={employee.eid} value={employee.eid}>
                  {employee.ename}
                </option>
              ))}
            </select>
          </div>
          {/* Task dropdown */}
          <div className='mb-3'>
            <label htmlFor="tid"><strong>Task:</strong></label>
            <select
              className='form-control rounded-0'
              name='tid'
              onChange={(e) => setTid(e.target.value)}
              value={tid}
            >
              <option value=''>Select Task</option>
              {tasks.map(task => (
                <option key={task.tid} value={task.tid}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>
          {/* Start Date field */}
          <div className='mb-3'>
            <label htmlFor="startDate"><strong>Start Date:</strong></label>
            <input type="date" name='startDate' placeholder='Enter Start Date'
              onChange={(e) => setStartDate(e.target.value)} className='form-control rounded-0'/>
          </div>
          {/* Due Date field */}
          <div className='mb-3'>
            <label htmlFor="dueDate"><strong>Due Date:</strong></label>
            <input type="date" name='dueDate' placeholder='Enter Due Date'
              onChange={(e) => setDueDate(e.target.value)} className='form-control rounded-0'/>
          </div>
          
          <button className='btn btn-success w-100 rounded-0 mb-2'>Assign Task</button>
        </form>
        </div>
        <div className='d-flex justify-content-end'>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary btn-lg mt-3"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignTask;
