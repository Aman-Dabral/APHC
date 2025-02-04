import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from "react-router"
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="admins">
        <Route index path='login' element={<Login />} />
        <Route path='create_account' element={<CreateAccount />}></Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
