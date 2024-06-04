import { Scanner } from '@yudiel/react-qr-scanner'
import React, { useState } from 'react'
import BtnGredient from '../AdminPanel/Component/BtnGredient'
function QRStudentEntry() {
    const [stopScan, setStopScan] = useState(false)
    const [muteAudio, setMuteAudio] = useState(true)
    const [scanResultID, setScanResultID] = useState(0)
    const handleScanResult = (result) => {
        if (result[0].format === "qr_code") {
            const rawValue = result[0].rawValue;
            try {
                // Attempt to create a URL object from the scanned text
                const url = new URL(rawValue);

                // Check if the URL contains the 'name' parameter
                const getStudentID = url.searchParams.get('name');
                setScanResultID(getStudentID)
                console.log(getStudentID)
                setStopScan(true)
            } catch (error) {
                // Scanned text is not a valid URL
                alert("Student Not Exit OR Wrong QR Code Type");
            }
        } else {
            console.log("QR Code Not Exit Or Wrong QR Code")
        }
    };

    const handleScanCam = () => {
        setStopScan(false)
    }

    return (
        <div className='w-full h-full'>
            <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-[390px] h-full rounded-[20px]">
                {/* Show Scan Camera  */}
                <div className="flex flex-col CamScanQR bg-secondary w-f h-fit rounded-[20px] p-5">
                    <div className="headerCamScanQR text-accent h-[46px] flex justify-between mb-2">
                        <p className='font-bold'>Scan QR Here</p>
                        <button className="btn text-accent" onClick={() => handleScanCam()}>Start</button>
                    </div>
                    <div className="w-[350px] h-[350px] overflow-hidden rounded-lg">
                        {stopScan &&
                            (
                                <div className="scanSuccess w-full h-full bg-primary rounded-lg flex flex-col justify-center items-center text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-face">
                                        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                        <path d="M9 9h.01" />
                                        <path d="M15 9h.01" />
                                    </svg>
                                    <p className='flex'>Student ID {scanResultID} <span className='text-yellow-200'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg></span></p>
                                    <p>Please Check Your Purpose</p>
                                </div>
                            ) ||
                            (
                                <Scanner
                                    onScan={(result) => handleScanResult(result)}
                                    paused={stopScan}
                                    components={{ audio: muteAudio, torch: true }}
                                />
                            )
                        }
                    </div>
                </div>
                {/* Show Scan Camera  */}
                {/* Form Show Stundet infor after scan  */}
                <div className="flex-1 flex flex-col confirmForm w-full h-full bg-secondary rounded-[20px] p-5 overflow-auto scrollbar-hide">
                    <div className="headConfirmForm text-accent h-[46px] flex justify-between">
                        <p className='font-bold'>Student ID</p>
                        <BtnGredient btnType="Offline Mode"/>
                    </div>
                    <div className="formContainer space-y-2 text-accent">
                        <div className="inputbox space-y-2">
                            <label htmlFor="studentName">Student Name</label>
                            <input type="text" id='studentName' placeholder="Student Name" className="input input-bordered bg-primary w-full" />
                        </div>
                        <div className="inputbox space-y-2">
                            <label htmlFor="mejor">Mejor</label>
                            <input type="text" id='mejor' placeholder="Major" className="input input-bordered bg-primary w-full" />
                        </div>
                        <div className="inputbox space-y-2">
                            <label htmlFor="yearStudy">Year Of Study</label>
                            <input type="text" id='yearStudy' placeholder="Year Of Study" className="input input-bordered bg-primary w-full" />
                        </div>

                    </div>
                    <div className="checkPurpose space-y-5 grid mt-5">
                        <p className='font-bold text-accent'>Entry Purepose</p>
                        <div className='grid grid-cols-3 space-y-3'>
                            <div className="container-checkbox flex items-center gap-2">
                                <input type="checkbox" id='readbook' className="checkbox checkbox-sm checkbox-primary" />
                                <label htmlFor="readbook" className='label-text text-accent cursor-pointer hover:text-blue-300'>Read Book</label>
                            </div>
                            <div className="container-checkbox flex items-center gap-2">
                                <input type="checkbox" id='assigment' className="checkbox checkbox-sm checkbox-primary" />
                                <label htmlFor="assigment" className='label-text text-accent cursor-pointer hover:text-blue-300'>Assigment</label>
                            </div>
                            <div className="container-checkbox flex items-center gap-2">
                                <input type="checkbox" id='usePC' className="checkbox checkbox-sm checkbox-primary" />
                                <label htmlFor="usePC" className='label-text text-accent cursor-pointer hover:text-blue-300'>USE PC</label>
                            </div>
                            <div className="container-checkbox flex items-center gap-2">
                                <input type="checkbox" id='other' className="checkbox checkbox-sm checkbox-primary" />
                                <label htmlFor="other" className='label-text text-accent cursor-pointer hover:text-blue-300'>Other</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 container-button h-full items-end mt-5 grid grid-cols-2 gap-2">
                        <button className="btn btn-primary">Entry</button>
                        <button className="btn btn-outline border-blue-400 text-accent">Cancel</button>
                    </div>
                </div>
                {/* Form Show Stundet infor after scan  */}
            </div>
        </div>
    )
}

export default QRStudentEntry
