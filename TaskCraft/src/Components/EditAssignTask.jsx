import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAssignTask = ({ assignment_id }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/task/${assignment_id}`);
        const { data } = response;
        if (data.Status) {
          setTask(data.Task);
        } else {
          alert(data.Error);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
      setLoading(false);
    };

    fetchTask();
  }, [assignment_id]);

  const handleUpdate = async (updatedTask) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/update_task', updatedTask);
      const { data } = response;
      if (data.Status) {
        alert('Task updated successfully');
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>Edit Task Assignment</h1>
      {/* Form fields for editing task details */}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUpdate({
          ...task,
          // Include updated fields here
        });
      }}>
        {/* Include form inputs for task details */}
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditAssignTask;
