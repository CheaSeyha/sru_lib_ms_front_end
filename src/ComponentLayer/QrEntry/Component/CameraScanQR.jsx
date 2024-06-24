import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useDevices } from '@yudiel/react-qr-scanner';
import { useScanResultID } from '../../Context/ScanResultIDContext';
import { useNavigate } from 'react-router-dom';
import { Undo2 } from 'lucide-react';

function CameraScanQR() {
    const devices = useDevices();
    const [deviceId, setDeviceId] = useState("");
    const [stopScan, setStopScan] = useState(false);
    const [muteAudio, setMuteAudio] = useState(true);

    const { scanResultID, setScanResultID } = useScanResultID();

    const handleScanResult = (result) => {
        if (result[0].format === "qr_code") {
            const rawValue = result[0].rawValue;
            try {
                const url = new URL(rawValue);
                const getStudentID = url.searchParams.get('name');
                setScanResultID(getStudentID);
                console.log(getStudentID);
                setStopScan(true);
            } catch (error) {
                alert("Student Not Exist OR Wrong QR Code Type");
            }
        } else {
            console.log("QR Code Not Exist Or Wrong QR Code");
        }
    };

    const handleScanCam = () => {
        setStopScan(false);
        setScanResultID(null);
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="flex flex-col CamScanQR bg-secondary w-full h-fit rounded-[20px] p-5">
                <div className="headerCamScanQR text-accent h-[46px] flex justify-between mb-2">
                    <p className='text-[#32E2FF] font-semibold'>Scan Your Card Here</p>
                    <select onChange={(e) => setDeviceId(e.target.value)} className='select bg-base-300' value={deviceId}>
                        <option disabled={true} value={undefined}>Select a device</option>
                        {devices.map((device, index) => (
                            <option key={index} value={device.deviceId}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                    <button className="block sm:hidden back-button px-5 rounded-[10px] border hover:border-blue-400 transition-colors ease-in-out duration-300 group" onClick={handleBack}>
                        <Undo2 className="text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300" />
                    </button>
                </div>
                <div className="w-full h-full overflow-hidden rounded-lg">
                    {stopScan ? (
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
                            <p className='flex'>Student ID {scanResultID} <span className='text-yellow-200'></span></p>
                            <p>Please Check Your Purpose</p>
                        </div>
                    ) : (
                        <Scanner
                            constraints={{ deviceId }}
                            onScan={(result) => handleScanResult(result)}
                            paused={stopScan}
                            components={{ audio: muteAudio, torch: true }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default CameraScanQR;
