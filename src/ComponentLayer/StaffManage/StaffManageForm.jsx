import React, { useEffect } from 'react'
import TableStaff from './Component/TableStaff'
import useCRUDStaff from './Hook/useCRUDStaff'

function StaffManageForm() {
  const { loading } = useCRUDStaff()
  return (
    <>
      {loading ?
        (
          <main className='flex justify-center items-center w-full h-full space-y-5'>
            <span className="loading loading-dots text-accent loading-lg"></span>
          </main>
        ) :
        (
          <div className='w-full h-full text-accent'>
            <TableStaff />
          </div>
        )}
    </>

  )
}

export default StaffManageForm