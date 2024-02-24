import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

// Component definition
const ViewAssignTask = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('emp_email');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const config = {
          headers: {
            'Email': email
          }
        };
        const response = await axios.get('http://localhost:3000/auth/view_task', config);
        const { data } = response;
        if (data.Status) {
          setTasks(data.Tasks);
        } else {
          alert(data.Error);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle errors appropriately, e.g., redirect to an error page
      }
    };

    fetchTasks();
  }, [email]);

  const requestApproval = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/request_approval', {
        assignment_id: task.assignment_id,
        eid: task.eid,
        requestDate: new Date().toISOString(),
        status: 'Pending'
      });
      const { data } = response;
      if (data.Status) {
        alert('Approval request sent successfully');
        navigate('/employeedashboard');
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.error('Error sending approval request:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100 loginPage'>
      <div className='p-3 rounded w-90 border d-flex flex-wrap justify-content-center' style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid white'
      }}>
        <h2 className='w-100 mb-3 text-center' style={{ color: 'white' }}>View Tasks</h2>
        {tasks.map((task, index) => (
          <div key={index} className='w-48 p-2 border rounded m-2' style={{
            backgroundColor: 'rgba(0, 0, 139, 0.8)', // Dark blue with opacity
            border: '1px solid white'
          }}>
            {/* <p><strong>Assignment ID:</strong> {task.assignment_id}</p> */}
            <p><strong>Employee ID:</strong> {task.eid}</p>
            <p><strong>Assigned By Manager:</strong> {task.assignedBy}</p> 
            <p><strong>Start Date:</strong> {formatDate(task.startDate)}</p>
            <p><strong>Due Date:</strong> {formatDate(task.dueDate)}</p>
            <p><strong>Task Status:</strong> {task.taskStatus}</p>
            {/* <p><strong>Bonus Point:</strong> {task.bonusPoint}</p> */}
            {task.taskStatus === 'NotDone' && (
              <button
                onClick={() => requestApproval(task)}
                className="btn btn-success btn-sm"
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Request Approval
              </button>
            )}
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-end'>
        <button
          onClick={() => navigate('/employeedashboard')}
          className="btn btn-primary btn-lg mt-3"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewAssignTask;
