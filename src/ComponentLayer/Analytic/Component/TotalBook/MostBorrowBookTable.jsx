import React, { Component } from 'react'

export class MostBorrowBookTable extends Component {
    render() {
        return (
            <main className='font-noto w-full h-full text-accent space-y-5'>
                <div className="header h-[46px] flex justify-between">
                    <p>សៀវភៅដែលពេញនិយមខ្ចី</p>
                    <button className='btn text-accent'>View Details</button>
                </div>
                <div className="overflow-x-auto w-full h-[390px] overflow-y-auto scrollbar-hide">
                    <table className="table w-full">
                        {/* head */}
                        <thead className=' text-accent sticky top-0 left-0 bg-secondary'>
                            <tr>
                                <th>ចំណាត់ថ្នាក់</th>
                                <th>ឈ្មោះសៀវភៅ</th>
                                <th>ប្រភេទសៀវភៅ</th>
                                <th>ចំនួនខ្ចី/ដង</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>38</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>

        )
    }
}

export default MostBorrowBookTable