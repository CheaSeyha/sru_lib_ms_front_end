import React from 'react'
import { useScanResultID } from '../../Context/ScanResultIDContext'

function FormConfirmEntry() {
    //Call data from context to show Id of student after scan
    const {scanResultID} = useScanResultID()
    return (
        <>
            <div className="flex-1 flex flex-col confirmForm w-full h-fit bg-secondary rounded-[20px] p-5 overflow-auto scrollbar-hide">
                {/* form data of student  */}
                <div className="form-data space-y-2 text-accent">
                    <div className="flex-1 headConfirmForm text-accent h-[46px] flex justify-between">
                        <p className='font-bold'>Student ID <span className='text-blue-400'>{scanResultID ? scanResultID : ""}</span></p>
                        {/* <BtnGredient btnType="Offline Mode" /> */}
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="studentName">Student Name</label>
                        <input readOnly={true} type="text" id='studentName' placeholder="Student Name" className="input input-bordered bg-primary w-full" />
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="mejor">Mejor</label>
                        <input readOnly={true}  type="text" id='mejor' placeholder="Major" className="input input-bordered bg-primary w-full" />
                    </div>
                    <div className="inputbox space-y-2">
                        <label htmlFor="yearStudy">Year Of Study</label>
                        <input readOnly={true}  type="text" id='yearStudy' placeholder="Year Of Study" className="input input-bordered bg-primary w-full" />
                    </div>
                </div>
                {/* form data of student  */}
                {/* check purepose to entry from  */}
                <div className="check-purepose text-accent mt-5">
                    <p className='font-bold'>Entry Purpose</p>
                    <div className="container-check-purepose grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-5">
                        <div className="check-purepose flex items-center space-x-2">
                            <input type="checkbox" id='read_book' className="checkbox checkbox-primary checkbox-sm" />
                            <label htmlFor="read_book" className='label-text text-accent'>Read Book</label>
                        </div>
                        <div className="check-purepose flex items-center space-x-2">
                            <input type="checkbox" id='assigment' className="checkbox checkbox-primary checkbox-sm" />
                            <label htmlFor="assigment" className='label-text text-accent'>Assigment</label>
                        </div>
                        <div className="check-purepose flex items-center space-x-2">
                            <input type="checkbox" id='usePC' className="checkbox checkbox-primary checkbox-sm" />
                            <label htmlFor="usePC" className='label-text text-accent'>USE PC</label>
                        </div>
                        <div className="check-purepose flex items-center space-x-2">
                            <input type="checkbox" id='other' className="checkbox checkbox-primary checkbox-sm" />
                            <label htmlFor="other" className='label-text text-accent'>Other</label>
                        </div>
                    </div>
                </div>
                {/* check purepose to entry from  */}
                {/* confirm button  */}
                <div className="flex-1 container-button h-full items-end mt-5 grid grid-cols-2 gap-2">
                    <button className="btn btn-primary">Entry</button>
                    <button className="btn btn-outline border-blue-400 text-accent">Cancel</button>
                </div>
                {/* confirm button  */}
            </div>
        </>
    )
}

export default FormConfirmEntry