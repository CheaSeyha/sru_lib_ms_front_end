import React from 'react'
import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useDevices } from '@yudiel/react-qr-scanner'
import { useScanResultID } from '../../Context/ScanResultIDContext'
import { useNavigate } from 'react-router-dom'
import { Undo2 } from 'lucide-react';


function CameraScanQR() {
    const devices = useDevices()
    const [deviceId, setDeviceId] = useState("")

    const [stopScan, setStopScan] = useState(false)
    const [muteAudio, setMuteAudio] = useState(true)
    //set id of studetn from scan qr using context 
    const { scanResultID, setScanResultID } = useScanResultID()
    // const [scanResultID, setScanResultID] = useState(0)
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
        setScanResultID(null)
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // This will navigate to the previous URL in the history stack
    };
    return (
        <>
            <div className="flex flex-col CamScanQR bg-secondary w-full h-fit rounded-[20px] p-5">
                <div className="headerCamScanQR text-accent h-[46px] flex justify-between mb-2">
                    <p className='text-[#32E2FF] font-semibold'>Scan Your Card Here</p>
                    <select onChange={(e) => setDeviceId(e.target.value)} className='select bg-base-300'>
                        <option disabled={true} value={undefined}>Select a device</option>
                        {devices.map((device, index) => (
                            <option key={index} value={device.deviceId}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                    {/* <button className="btn text-accent" onClick={() => handleScanCam()}>Start</button> */}
                    <button className="block sm:hidden back-button px-5 rounded-[10px] border hover:border-blue-400 transition-colors ease-in-out duration-300 group" onClick={handleBack}>
                        <Undo2 className="text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300" />
                    </button>
                </div>
                <div className="w-full h-full overflow-hidden rounded-lg">
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
                                constraints={{
                                    deviceId: deviceId
                                }}
                                onScan={(result) => handleScanResult(result)}
                                paused={stopScan}
                                components={{ audio: muteAudio, torch: true }}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CameraScanQR