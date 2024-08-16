import React from 'react'
import BtnGredient from '../../../layout/Component/BtnGredient'
import { UserPlus } from 'lucide-react'


function TableStaff() {
    return (
        <div className='w-full h-full bg-secondary rounded-[20px] p-5 font-noto space-y-5 '>
            <div className="header flex justify-between">
                <p>នាមសមាសភាពមន្ត្រីកំពុងបម្រើការងារនៅក្នុងបណ្ណាល័យ </p>
                <div className="button-container flex gap-5">
                    <BtnGredient onClick={() => console.log("Test")}>
                        <UserPlus />
                        <p>បញ្ចូលបុគ្គលិក</p>
                    </BtnGredient>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="ស្វែងរកឈ្មោះបុគ្គលិក,ID" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
            </div>
            <div className="table-contianer w-full h-full ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-accent text-[15px]'>
                            <th>អត្តលេខ</th>
                            <th>នាម គោត្តនាម</th>
                            <th>ភេទ</th>
                            <th>តួនាទី</th>
                            <th>កម្រិតសិក្សា</th>
                            <th>ជំនាញ</th>
                            <th>ឆ្នាំទី</th>
                            <th>វេនធ្នើការ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr className='text-[15px]'>
                            <td>
                                300124
                            </td>
                            <td>
                                សាស្ត្រាចារ្យជំនួយ ប៉ែន ឌីណា
                            </td>
                            <td>
                                ប្រុស
                            </td>
                            <td>
                                មន្ត្រីទទួលបន្ទុក
                            </td>
                            <td>
                                បរិ.ជាន់ខ្ពស់
                            </td>
                            <td>
                                ១. វិទ្យាសាស្ត្រនយោបាយ
                                ២.វិទ្យាសាស្ត្រអប់រំ

                            </td>
                            <td>

                            </td>
                            <td>
                                ពេញម៉ោង
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableStaff