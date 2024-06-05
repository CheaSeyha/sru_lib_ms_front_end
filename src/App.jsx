import React from 'react'
import AdminPanel from './ComponentLayer/AdminPanel'
import { HideSideBarProvidor } from './Context/HideSidebarContext'
import { ThemeSwitchProvider } from './Context/ThemeSwitchContext'

function App() {
  return (
    <HideSideBarProvidor>
      <ThemeSwitchProvider>
        <div className='bg-base-300'>
          <AdminPanel />
        </div>
      </ThemeSwitchProvider>
    </HideSideBarProvidor>

  )
}

export default App
