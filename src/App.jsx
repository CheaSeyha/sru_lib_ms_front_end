import React from 'react'
import Sidebar from './layout/SideBar'
import { Route, Routes } from 'react-router'
import AdminPanel from './AdminPenel/AdminPanel'

function App() {
  return (
    <div className='bg-base-300 h-fit'>
      <AdminPanel />
    </div>
  )
}

export default App
