import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useDevices } from '@yudiel/react-qr-scanner';
import { useScanResultID } from '../../Context/ScanResultIDContext';
import { useNavigate } from 'react-router-dom';
import { Undo2, Settings, X } from 'lucide-react';
import Modal from '../../../layout/Component/Modal';
import toast from 'react-hot-toast';

function CameraScanQR({ stopScan }) {
    const devices = useDevices();
    const [deviceId, setDeviceId] = useState("");
    const [muteAudio, setMuteAudio] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const { scanResultID, setScanResultID } = useScanResultID();

    const handleScanResult = (result) => {
        // Check if the scan is of type QR code
        if (result[0].format === "qr_code") {
            // Get the value from the scan
            const rawValue = result[0].rawValue;
            try {
                const url = new URL(rawValue);
                // Extract the student ID from the URL
                const getStudentID = url.searchParams.get('name');

                if (getStudentID) {
                    // Set student ID to context (global var)
                    setScanResultID(getStudentID);
                } else {
                    // Notify user that the QR code is wrong or student not found
                    toast.error("Student Not Found Or Wrong QR Code");
                }
            } catch (error) {
                toast.error("Student Not Found Or Wrong QR Code");
            }
        } else {
            console.log("QR Code Not Exist Or Wrong QR Code");
        }
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="flex flex-col CamScanQR bg-secondary w-full h-fit rounded-[20px] p-5">
                <div className="headerCamScanQR text-accent h-[46px] flex justify-between items-center mb-2">
                    <p className='text-[#32E2FF] font-semibold'>Scan Your Card Here</p>
                    <div className='flex gap-5'>
                        <button className="text-accent hover:text-blue-400" onClick={() => setShowModal(true)}><Settings /></button>
                        <button className="block sm:hidden back-button px-5 h-[46px] rounded-[10px] border hover:border-blue-400 transition-colors ease-in-out duration-300 group" onClick={handleBack}>
                            <Undo2 className="text-current group-hover:text-blue-400 transition-colors ease-in-out duration-300" />
                        </button>
                    </div>
                </div>
                <div className="w-full sm:h-[190px] md:h-[190px] lg:h-[250px] xl:h-[350px] overflow-hidden p-0 rounded-lg">
                    {stopScan ? (
                        <div className="scanSuccess w-full h-full bg-primary rounded-lg flex flex-col justify-center items-center text-center text-accent p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-face">
                                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                <path d="M9 9h.01" />
                                <path d="M15 9h.01" />
                            </svg>
                            <p className='flex'>Scan Success<span className='text-yellow-200'></span></p>
                            <p>Please Check Your Purpose</p>
                        </div>
                    ) : (
                        <Scanner
                            constraints={{ deviceId }}
                            onScan={(result) => handleScanResult(result)}
                            paused={stopScan}
                            scanDelay={1000}
                            allowMultiple={true}
                            components={{ audio: true, torch: true }}
                        />
                    )}
                </div>

                {/* Modal ------------------------------------- */}
                <Modal isVisible={showModal} key={"setting camera"}>
                    <div className="container w-full h-full space-y-5">
                        <div className="header-modal flex items-center justify-between text-accent">
                            <p>Change Camera</p>
                            <button onClick={() => setShowModal(false)} className="btnClose w-[46px] text-accent h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out">
                                <X />
                            </button>
                        </div>
                        <div className="body-modal text-accent">
                            <select id='chnageCam' onChange={(e) => setDeviceId(e.target.value)} className='select bg-base-300 border w-full' value={deviceId}>
                                <option disabled={true} value={undefined}>Select a device</option>
                                {devices.map((device, index) => (
                                    <option key={index} value={device.deviceId}>
                                        {device.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default CameraScanQR;
