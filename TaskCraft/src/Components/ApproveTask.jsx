import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApproveTask.css';

const goToDashboard = () => {
  window.location.href ='/dashboard';
};


const ApproveTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [selectedBonusPoints, setSelectedBonusPoints] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/tasks_to_approve');
        if (response.data.Status) {
          setTasks(response.data.Tasks);
        } else {
          setError('Error: ' + response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = async (assignment_id, newStatus) => {
    const bonusPoint = selectedBonusPoints[assignment_id] || 1;      //
    try {
      const response = await axios.post('http://localhost:3000/auth/update_task_status', {
        assignment_id,
        status: newStatus,
        bonusPoint
      });
      if (response.data.Status) {
        setTasks(prevTasks => prevTasks.filter(task => task.assignment_id !== assignment_id));
      
      } else {
        setError('Error: ' + response.data.Error);
      }
    } catch (error) {
      console.error(`Error updating task status:`, error);
      setError('Error updating task status');
    }
  };

  const handleBonusPointChange = (assignment_id, value) => {
    setSelectedBonusPoints(prev => ({ ...prev, [assignment_id]: value }));
  };
  
  return (
    <div className='d-flex flex-column align-items-center vh-100 loginPage' style={{ paddingTop: '10%' }}>
      <div className='p-3 rounded w-95 border' style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid white'
      }}>
        <h1 style={{ fontWeight: 'bold' }}>Manager Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="approve-task-table">
        <thead>
          <tr>
            <th>Assigned By </th>
            <th>Employee Name</th>
            <th>Task Status</th>
            <th>Select Bonus Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.assignment_id}>
              <td>{task.mname}</td>
              <td>{task.ename}</td>
              <td>{task.status}</td>
              <td>
            <select
              value={selectedBonusPoints[task.assignment_id] || 1}
              onChange={(e) => handleBonusPointChange(task.assignment_id, e.target.value)}
            >
              {[1, 2, 3, 4, 5].map(point => (
                <option key={point} value={point}>{point}</option>
              ))}
            </select>
          </td>
              <td>
                  <button onClick={() => {
                    updateTaskStatus(task.assignment_id, 'Approved');
                  }}>
                    Approve
                  </button>
                  <button onClick={() => {
                    updateTaskStatus(task.assignment_id, 'Denied');
                  }}>
                    Deny
                  </button>
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='d-flex justify-content-end'>
        <button
          onClick={() => goToDashboard()}
          className="btn btn-primary btn-lg mt-3"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ApproveTask;
