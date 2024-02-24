import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const { tid } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    pid: '',
    aid: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/task/${tid}`)
      .then((result) => {
        setTask({
          title: result.data.Result[0].title,
          description: result.data.Result[0].description,
          pid: result.data.Result[0].pid,
          aid: result.data.Result[0].aid
        });
      })
      .catch((err) => console.log(err));
  }, [tid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/edit_task/${tid}`, task)
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
        <h3 className="text-center">Edit Task</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputTitle"
              placeholder="Enter Title"
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control rounded-0"
              id="inputDescription"
              placeholder="Enter Description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPid" className="form-label">
              Project ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPid"
              placeholder="Enter Project ID"
              value={task.pid}
              onChange={(e) =>
                setTask({ ...task, pid: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAid" className="form-label">
              Assignee ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAid"
              placeholder="Enter Assignee ID"
              value={task.aid}
              onChange={(e) =>
                setTask({ ...task, aid: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
