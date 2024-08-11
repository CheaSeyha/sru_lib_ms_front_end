import React from 'react'
import TotalBook from './Component/TotalBook/TotalBook'
import EntryPurposeCard from './Component/EntryPurpose/EntryPurposeCardForm'
import TotalEntryCardForm from './Component/TotalEntry/TotalEntryCardForm'

function AnalyticForm() {
    return (
        <main className='flex flex-col w-full h-fit xl:h-full space-y-5'>
            <div className="headr-card w-full h-fit 2xl:h-[397px] flex flex-col 2xl:flex-row gap-5">
                <div className="total-book flex flex-col xl:flex-row gap-5 w-full h-full">
                    <TotalBook />
                    <EntryPurposeCard />
                </div>
                <div className="total-entry">
                    <TotalEntryCardForm />
                </div>
            </div>
        </main>
    )
}

export default AnalyticForm