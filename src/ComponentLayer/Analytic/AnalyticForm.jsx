import React from 'react'
import TotalBook from './Component/TotalBook/TotalBook'
import EntryPurposeCard from './Component/EntryPurpose/EntryPurposeCardForm'
import TotalEntryCardForm from './Component/TotalEntry/TotalEntryCardForm'

function AnalyticForm() {
    return (
        <main className='flex flex-col w-full h-fit xl:h-full space-y-5'>
            <div className="headr-card w-full h-[397px] flex gap-5">
                <div className="total-book w-full h-full">
                    <TotalBook />
                </div>
                <div className="total-purpose w-full h-full">
                    <EntryPurposeCard />
                </div>
                <div className="total-entry w-[377px]">
                    <TotalEntryCardForm />
                </div>
            </div>
        </main>
    )
}

export default AnalyticForm