import React from 'react'
import TotalBook from './Component/TotalBook/TotalBook'
import EntryPurposeCard from './Component/EntryPurpose/EntryPurposeCardForm'
import TotalEntryCardForm from './Component/TotalEntry/TotalEntryCardForm'
import BookAnalyticForm from './Component/TotalBook/BookAnalyticForm'

function AnalyticForm() {
    return (
        <main className='flex flex-col w-full'>
            <div className="headr-card w-full h-full space-y-5">
                <div className="total-book flex flex-col xl:flex-row gap-5 w-full h-full">
                    <TotalBook />
                    <EntryPurposeCard />
                </div>
                <div className="book-analytic">
                    <BookAnalyticForm/>
                </div>
            </div>
        </main>
    )
}

export default AnalyticForm