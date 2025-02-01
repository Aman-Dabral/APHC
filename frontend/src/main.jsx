import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from "react-router"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="admins">
          <Route index path='login' element={<Login />} />
          <Route path='create_account' element={<><h1>Hello World</h1></>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
