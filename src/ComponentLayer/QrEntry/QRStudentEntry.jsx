import { Scanner } from '@yudiel/react-qr-scanner'
import React from 'react'

function QRStudentEntry() {
    
    const handleScanResult = (text) => {
        if (text) {
            try {
                // Attempt to create a URL object from the scanned text
                const url = new URL(text);

                // Check if the URL contains the 'name' parameter
                const getStudentID = url.searchParams.get('name');
                if (getStudentID) {
                    // If 'name' parameter exists, disable scanning and set the student ID
                    setEnabledScan(false);
                    setStudentID(getStudentID);
                }
            } catch (error) {
                // Scanned text is not a valid URL
                alert("Student Not Exit OR Wrong QR Code Type");
            }
        }
    };
    return (
        <div className='w-full h-full'>
            <div className="ScanQR-ConfirmForm w-[390px] h-full rounded-[20px]">
                <div className="flex flex-col CamScanQR bg-secondary w-f h-fit rounded-[20px] p-5">
                    <div className="headerCamScanQR text-accent h-[46px]">
                        <p>Scan Your QR Here</p>
                    </div>
                    <div className="w-[350px] h-[350px]">
                        <Scanner
                            onResult={(text) => handleScanResult(text)}
                            // enabled={enabledScan}
                            components={{ tracker: true, audio: false }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QRStudentEntry
