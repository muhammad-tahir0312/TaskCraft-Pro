import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const goToDashboard = () => {
  window.location.href ='/dashboard';
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/project')
      .then(result => {
        if (result.data.Status) {
          setProjects(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (pid) => {
    axios.delete(`http://localhost:3000/auth/delete_project/${pid}`)
      .then(result => {
        if (result.data.Status) {
          setProjects(projects.filter(p => p.pid !== pid));
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Project List</h3>
      </div>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.pid}>
                <td>{project.pid}</td>
                <td>{project.ptitle}</td>
                <td>{project.pdescription}</td>
                <td>{formatDate(project.due_date)}</td>
                <td>{formatDate(project.start_date)}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(project.pid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <Link to="/dashboard/add_project" className='btn btn-success'>Add Project</Link>
      </div>
      <button
        onClick={goToDashboard}
        className="btn btn-primary btn-lg"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Project;
