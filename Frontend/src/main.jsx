import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import StudentDetail from './components/StudentDetail'
import AddStudent from './components/AddStudent'
import AddTeacher from './components/AddTeacher'
import AddFaculte from './components/AddFaculte.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App /> },
  {path: '/students/:student_id', element: <StudentDetail /> },
  {path: '/add-student', element: <AddStudent /> },
  {path: '/add-teacher', element: <AddTeacher /> },
  {path: '/add-faculte', element: <AddFaculte /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
