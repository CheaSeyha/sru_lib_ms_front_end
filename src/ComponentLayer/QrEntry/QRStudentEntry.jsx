import { Scanner } from '@yudiel/react-qr-scanner'
import React, { useState } from 'react'

function QRStudentEntry() {
    const [stopScan, setStopScan] = useState(false)
    const [muteAudio,setMuteAudio] = useState(true)
    const [scanResultID,setScanResultID] = useState(0)
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
            <div className="ScanQR-ConfirmForm w-[390px] h-full rounded-[20px]">
                <div className="flex flex-col CamScanQR bg-secondary w-f h-fit rounded-[20px] p-5">
                    <div className="headerCamScanQR text-accent h-[46px] flex justify-between mb-2">
                        <p>Scan Your QR Here</p>
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
                                    components={{audio:muteAudio,torch:true}}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QRStudentEntry
