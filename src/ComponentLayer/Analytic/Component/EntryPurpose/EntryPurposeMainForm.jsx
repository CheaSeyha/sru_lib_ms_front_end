import React from 'react'
import TotalEntryCardForm from './TotalEntryCardForm'
import EntryTableBaseOnMajor from './EntryTableBaseOnMajor'
import LineChart from '../Chart/LineChart'
function EntryPurposeMainForm() {

    const mySeriesData = [
        {
            name: "អាន",
            data: [26, 12, 23, 15, 16, 10, 24, 46, 8]
        },
        {
            name: "ប្រើ PC",
            data: [16, 36, 26, 17, 38, 27, 17, 24, 16]
        },
        {
            name: "កិច្ចការសាលា",
            data: [3, 5, 8, 9, 11, 13, 16, 11, 13]
        },
        {
            name: "ផ្សេងៗ",
            data: [3, 5, 8, 9, 11, 13, 16, 11, 13]
        }
    ];

    const myCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const myTitle = 'ចំនួននិស្សិតចូលប្រើប្រាស់បណ្ណាល័យប្រចាំខែ';

    return (
        <div className="continaer h-full text-white rounded-[20px] grid gap-5">
            <div className='h-full text-white rounded-[20px] grid grid-cols-1 2xl:grid-cols-2 gap-5'>
                <div className="header-card w-full h-[994px] md:h-[497px] grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TotalEntryCardForm />
                    <EntryTableBaseOnMajor />
                </div>
                <div className="header-card h-[497px] flex gap-5 bg-secondary p-5 rounded-[20px]">
                    <LineChart
                        seriesData={mySeriesData}
                        categories={myCategories}
                        title={myTitle}
                    />
                </div>
            </div>
            <div className="table-entry-hour h-[497px] grid grid-cols-2 gap-5">
                <div className="table-stu bg-secondary p-5 h-full rounded-[20px] font-noto">
                    <div className="header h-[46px] text-accent">
                        <p>ចំនួនម៉ោងនិស្សិតចូលប្រើប្រាស់បណ្ណាល័យ</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-accent'>
                                    <th>ចំណាត់ថ្នាក់</th>
                                    <th>អត្តលេខ</th>
                                    <th>ឈ្មោះនិស្សិត</th>
                                    <th>ជំនាញ</th>
                                    <th>កំរិត</th>
                                    <th>សរុបចំនួនម៉ោង</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-accent hover'>
                                    <td>1</td>
                                    <td>300124</td>
                                    <td>ព្រំ ចាន់ថន</td>
                                    <td>CS</td>
                                    <td>Bachalor</td>
                                    <td>289 ម៉ោង</td>
                                </tr>
                                <tr className='text-accent hover'>
                                    <td>2</td>
                                    <td>300168</td>
                                    <td>ចន វិក</td>
                                    <td>CS</td>
                                    <td>Bachalor</td>
                                    <td>189 ម៉ោង</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="table-stu bg-secondary p-5 h-full rounded-[20px] font-noto">
                    <div className="header h-[46px] text-accent">
                        <p>ចំនួនម៉ោងបុគ្គលិកSRUចូលប្រើប្រាស់បណ្ណាល័យ</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-accent'>
                                    <th>ចំណាត់ថ្នាក់</th>
                                    <th>អត្តលេខ</th>
                                    <th>ឈ្មោះបុគ្គលិក</th>
                                    <th>មុខដំណែង</th>
                                    <th>សរុបចំនួនម៉ោង</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-accent hover'>
                                    <td>1</td>
                                    <td>300124</td>
                                    <td>ព្រំ ចាន់ថន</td>
                                    <td>គ្រូ</td>
                                    <td>289 ម៉ោង</td>
                                </tr>
                                <tr className='text-accent hover'>
                                    <td>2</td>
                                    <td>300168</td>
                                    <td>ចន វិក</td>
                                    <td>និស្សិតហាត់ការ</td>
                                    <td>189 ម៉ោង</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default EntryPurposeMainForm
