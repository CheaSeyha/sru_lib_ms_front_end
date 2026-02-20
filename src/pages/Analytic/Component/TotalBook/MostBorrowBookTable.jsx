import React, { useEffect, useState } from 'react'

function MostBorrowBookTable({ bookBorrowData }) {
    const [showBorrowBook, setShowBorrowedBook] = useState([])

    useEffect(() => {
        setShowBorrowedBook(bookBorrowData)
    }, [bookBorrowData])

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
                        {showBorrowBook.map((data, index) => (
                            <tr key={data.rank} className='hover'>
                                <th>{data.rank}</th>
                                <td>{data.bookTitle}</td>
                                <td>{data.genre}</td>
                                <td>{data.borrowQuan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default MostBorrowBookTable