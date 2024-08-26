import React from 'react'

function EntryTableBaseOnMajor() {
    const bookBorrowed = [
        {
            majorName: "Computer Science",
            borrowedNumber: 35,
        },
        {
            majorName: "Public Administration",
            borrowedNumber: 37,
        },
        {
            majorName: "English",
            borrowedNumber: 26,
        },
        {
            majorName: "Math",
            borrowedNumber: 94,
        },
        {
            majorName: "Business",
            borrowedNumber: 46,
        }
        ,
        {
            majorName: "Business",
            borrowedNumber: 46,
        }

    ];
    // Define a fixed set of colors
    const defaultColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#F7464A',
        '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#FDB45C', '#F4C542',
        '#36A2EB', '#FF9F40', '#FFCE56', '#F7464A', '#4BC0C0', '#FF6384',
        '#46BFBD', '#F4C542', '#9B59B6'
    ];

    // Calculate the total borrowed number
    const totalBorrowed = bookBorrowed.reduce((sum, item) => sum + item.borrowedNumber, 0);

    // Slice colors array to match the number of data points
    const colors = defaultColors.slice(0, bookBorrowed.length);


    return (
        <div className='w-full h-full text-white rounded-[20px] bg-secondary p-5 overflow-scroll scrollbar-hide'>
            <div className="font-noto h-[46px] w-full text-center">សរុបចំនួនចូលបណ្ណាល័យក្នុងខែនេះ</div>
            <table className="table text-accent font-noto overflow-auto">
                {/* head */}
                <thead className='text-accent sticky top-0 left-0 bg-secondary'>
                    <tr className='border-none '>
                        <th></th>
                        <th>មហាវិទ្យាល័យ</th>
                        <th>ចំនួនចូល</th>
                        <th>គិតជាភាគរយ</th>
                    </tr>
                </thead>
                <tbody>
                    {bookBorrowed.map((item, index) => {
                        const percentage = ((item.borrowedNumber / totalBorrowed) * 100).toFixed(2);
                        return (
                            <tr key={index} className='hover:bg-primary border-none'>
                                <th>
                                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: colors[index] }}></div>
                                </th>
                                <td>{item.majorName}</td>
                                <td>{item.borrowedNumber}</td>
                                <td>{percentage}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EntryTableBaseOnMajor
