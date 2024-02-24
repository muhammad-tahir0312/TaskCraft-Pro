import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [pid, setPid] = useState('');
  const [aid, setAid] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/view_projects')
      .then(result => {
        if (result.data.Status) {
          setProjects(result.data.Tasks); // Change 'Projects' to 'Tasks'
        } else {
          console.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_task', { title, desc, pid, aid })
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/task');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border'>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="title"><strong>Task Title:</strong></label>
            <input type="text" name='title' placeholder='Enter Task'
              onChange={(e) => setTitle(e.target.value)} className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="desc"><strong>Task Description:</strong></label>
            <input type="text" name='desc' placeholder='Enter Task Description'
              onChange={(e) => setDesc(e.target.value)} className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="pid"><strong>Project ID:</strong></label>
            <select
              className='form-control rounded-0'
              name='pid'
              onChange={(e) => setPid(e.target.value)}
              value={pid}
            >
              <option value=''>Select Project</option>
              {projects && projects.map(project => (
                <option key={project.pid} value={project.pid}>
                  {project.ptitle}
                </option>
              ))}
            </select>
          </div>
          {/* <div className='mb-3'>
            <label htmlFor="aid"><strong>Assignment ID:</strong></label>
            <input type="text" name='aid' placeholder='Enter Assignment ID'
              onChange={(e) => setAid(e.target.value)} className='form-control rounded-0' />
          </div> */}
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
