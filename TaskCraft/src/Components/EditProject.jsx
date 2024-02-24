import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
  const [project, setProject] = useState({
    ptitle: '',
    pdescription: '',
    due_date: '',
    start_date: ''
  });
  const { pid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/project/${pid}`)
      .then(result => {
        if (result.data.Status) {
          setProject(result.data.Project);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error('Error fetching project:', err));
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/update_project/${pid}`, project)
      .then(result => {
        if (result.data.Status) {
          alert('Project updated successfully');
          navigate('/dashboard/project'); // Navigate back to the project list
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error('Error updating project:', err));
  };

  return (
    <div className='edit-project'>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='ptitle'>Title</label>
          <input
            type='text'
            className='form-control'
            id='ptitle'
            name='ptitle'
            value={project.ptitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='pdescription'>Description</label>
          <textarea
            className='form-control'
            id='pdescription'
            name='pdescription'
            value={project.pdescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='due_date'>Due Date</label>
          <input
            type='date'
            className='form-control'
            id='due_date'
            name='due_date'
            value={project.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='start_date'>Start Date</label>
          <input
            type='date'
            className='form-control'
            id='start_date'
            name='start_date'
            value={project.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
