import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProject = () => {
    const [ptitle, setPtitle] = useState('')
    const [pdescription, setPdescription] = useState('')
    const [due_date, setDue_date] = useState('')
    const [start_date, setStart_date] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_project', {ptitle, pdescription, due_date, start_date})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/project')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border'>
            <h2>Add Project</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="title"><strong>Project Title:</strong></label>
                    <input type="text" name='title' placeholder='Enter roject Title'
                     onChange={(e) => setPtitle(e.target.value)} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="description"><strong>Project Description:</strong></label>
                    <input type="text" name='description' placeholder='Enter Project Description'
                     onChange={(e) => setPdescription(e.target.value)} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="due"><strong>Due Date:</strong></label>
                    <input type="date" name='due' placeholder='Enter Due Date'
                     onChange={(e) => setDue_date(e.target.value)} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="start"><strong>Start Date:</strong></label>
                    <input type="date" name='start' placeholder='Enter Start Date'
                     onChange={(e) => setStart_date(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Project</button>
            </form>
        </div>
    </div>
  )
}

export default AddProject