import React from 'react'
import TotalBook from './Component/TotalBook/TotalBook'
import EntryPurposeCard from './Component/EntryPurpose/EntryPurposeCardForm'

function AnalyticForm() {
    return (
        <main className='flex flex-col w-full h-fit xl:h-full space-y-5'>
            <div className="headr-card w-full h-[397px] flex gap-5">
                <TotalBook/>
                <EntryPurposeCard/>
            </div>
        </main>
    )
}

export default AnalyticForm