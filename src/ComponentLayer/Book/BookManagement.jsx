import React from 'react'
import FormInput from './Component/FormInput'
import ListOfAllBook from './Component/ListOfAllBook'
function BookManagement() {
    return (
        <>
            <div className="flex flex-col h-full overflow-auto">
                <FormInput/>
            </div>
        </>
    )
}

export default BookManagement