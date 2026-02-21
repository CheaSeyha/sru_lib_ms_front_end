import React from "react";
import CameraScanQR from "./Component/CameraScanQR";
import CardDataOfStudentEntry from "./Component/CardDataOfStudentEntry";
import FormConfirmEntry from "./Component/FormConfirmEntry";
import TableStudentEntryData from "./Component/TableStudentEntryData";
import useScanEntry from "../../Hook/useScanEntry";
import StudentCardInfor from "./Component/StudentCardInfor";

function QRStudentEntry() {
  const {
    stopScan,
    studetnEntryData,
    checkPurpose,
    setCheckPurpose,
    disCheckPur,
    cardDataEntry,
    stuEntryInfor,
    handleClearFormData,
    handleSaveEntry,
  } = useScanEntry();

  return (
    <div className="z-30 w-full h-fit sm:h-full flex flex-col-reverse sm:flex-row space-x-0 sm:space-x-5">
      <div className="flex flex-col space-y-5 ScanQR-ConfirmForm w-full sm:w-[230px] lg:w-[290px] xl:w-[390px] rounded-[20px]">
        <CameraScanQR stopScan={stopScan} />
        <StudentCardInfor
          checkPurpose={checkPurpose}
          setCheckPurpose={setCheckPurpose}
          disCheckPur={disCheckPur}
          stuEntryInfor={stuEntryInfor}
          handleClearFormData={handleClearFormData}
          handleSaveEntry={handleSaveEntry}
        />
      </div>
      <div className="flex-1 sm:flex flex-col data-of-entry-table w-full h-full sm:space-y-5 overflow-auto mb-5 sm:mb-0">
        <div className="student-entry-card w-full h-[104px] grid grid-cols-3 gap-5">
          {cardDataEntry.map((data, index) => (
            <CardDataOfStudentEntry
              amountData={data.dataNumber}
              cardType={data.cardType}
              key={index}
            />
          ))}
        </div>
        <TableStudentEntryData studentEntryData={studetnEntryData} />
      </div>
    </div>
  );
}

export default QRStudentEntry;
