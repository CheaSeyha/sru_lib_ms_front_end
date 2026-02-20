import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Alert_Voice from "../../../assets/image/Alert_Voice.mp3";
const AlertWithSound = ({ newData }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (newData) {
      // Get the alerted data from localStorage
      const alertedData = JSON.parse(localStorage.getItem('alertedData')) || {};

      // Check if the current data has already been alerted
      if (!alertedData[newData.borrowId]) {
        // Play the alert sound three times
        const audio = new Audio(Alert_Voice);
        audio.play();
        setTimeout(() => audio.play(), 1000);
        setTimeout(() => audio.play(), 2000);

        // Show the alert
        setShowAlert(true);

        // Store the alert count in localStorage
        alertedData[newData.borrowId] = 3;
        localStorage.setItem('alertedData', JSON.stringify(alertedData));

        // Hide the alert after 6 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
    }
  }, [newData]);

  return (
    <>
      {showAlert && <Alert severity="info">New student have not return!!!</Alert>}
    </>
  );
};

export default AlertWithSound;
