import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

const goToDashboard = () => {
    window.location.href ='/dashboard';
  };

const Task = () => {
    const [task, setTask] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/auth/task')
        .then(result => {
            if(result.data.Status) {
                setTask(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_task/'+id)
        .then(result => {
            if(result.data.Status) {
                window.location.reload()
            } else {
                alert(result.data.Error)
            }
        })
      } 

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Task List</h3>
            </div>
            <div className='mt-3'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Project Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map(c => (
                            <tr key={c.tid}>
                                <td>{c.tid}</td>
                                <td>{c.title}</td>
                                <td>{c.description}</td>
                                <td>{c.ptitle}</td>
                                <td>
                                <Link
                                    to={`/dashboard/edit_task/` + c.tid}
                                    className="btn btn-info btn-sm me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleDelete(c.tid)}
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
                <Link to="/dashboard/add_task" className='btn btn-success'>Add Task</Link>
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
    )
}

export default Task
