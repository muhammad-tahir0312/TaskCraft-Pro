import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import EmployeeDashboard from './Components/EmployeeDashboard'
import Home from './Components/Home'
import EmployeeHome from './Components/EmployeeHome'
import Employee from './Components/Employee'
import Task from './Components/Task'
import Project from './Components/Project'
import AddProject from './Components/AddProject'
import EditProject from './Components/EditProject'
import AddTask from './Components/AddTask'
import EditTask from './Components/EditTask'
import DeleteTask from './Components/DeleteTask'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import DeleteEmployee from './Components/DeleteEmployee'
import Start from './Components/Start'
import AssignTask from './Components/AssignTask'
import ViewAssignTask from './Components/ViewAssignTask'
import EditAssignTask from './Components/EditAssignTask'
import EmployeeProfile from './Components/EmployeeProfile'
import ManagerProfile from './Components/ManagerProfile'
import ApproveTask from './Components/ApproveTask'

function App() {     ApproveTask
  
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/employeedashboard' element={<EmployeeDashboard />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='employeehome' element={<EmployeeHome />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/task' element={<Task />}></Route>
        <Route path='/dashboard/project' element={<Project />}></Route>
        <Route path='/dashboard/add_project' element={<AddProject/>}></Route>
        <Route path='/dashboard/edit_project/:pid' element={<EditProject/>}></Route>
        <Route path='/dashboard/add_task' element={<AddTask />}></Route>
        <Route path='/dashboard/edit_task/:tid' element={<EditTask />}></Route>        
        <Route path='/dashboard/delete_task/:tid' element={<DeleteTask />}></Route>
        <Route path='/dashboard/assigntask' element={<AssignTask />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/delete_employee/:id' element={<DeleteEmployee />}></Route>
        <Route path='/employeedashboard/viewassigntask' element={<ViewAssignTask />}></Route>
        <Route path="/employeedashboard/editassigntask/:assignment_id" element={<EditAssignTask/>} />
        <Route path='/employeedashboard/employeeprofile' element={<EmployeeProfile />}></Route> 
        <Route path='/dashboard/managerprofile' element={<ManagerProfile />}></Route> 
        <Route path='/dashboard/approvetask' element={<ApproveTask />}></Route>               
    </Routes>
    </BrowserRouter>
  )
}

export default App
