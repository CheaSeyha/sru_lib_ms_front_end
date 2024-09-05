import React from 'react'

import TableStudentData from './Component/TableStudentData'
function StudentManage() {
    return (
        <div className='w-full h-fit md:h-full bg-secondary rounded-[20px] p-5 font-noto space-y-5 text-accent'>
            <div className='w-full h-full'>
                <TableStudentData />
            </div>
        </div>
    )
}

export default StudentManage