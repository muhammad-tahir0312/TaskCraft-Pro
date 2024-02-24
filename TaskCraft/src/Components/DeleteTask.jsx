import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const handleDelete = () => {
      axios
        .delete(`http://localhost:3000/auth/delete_task/${id}`)
        .then((result) => {
          if (result.data.Status) {
            navigate('/dashboard/task');
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center">Delete Task</h3>
          <div className="text-center mt-3">
            <p>Are you sure you want to delete this task?</p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

export default DeleteTask