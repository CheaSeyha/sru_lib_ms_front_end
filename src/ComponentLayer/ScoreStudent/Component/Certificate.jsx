// src/components/Certificate.js
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import BtnGredient from '../../Book/BtnGredient';
import logo from '../../../assets/logo/sru_logo.png';  // Assuming the logo is stored in the src/assets folder
import frame from '../../../assets/logo/frame1.png'; // Assuming the frame is stored in the src/assets folder
import medal from '../../../assets/logo/Medal.png';
import book from '../../../assets/logo/book.png';
import libraryImg from '../../../assets/image/library.png';
import callAddFont from '../Font/LCALLIG-bold.js';
import Bodyfont from '../Font/Body_Font.js';
import fontname from '../Font/Font_Name.js';
const Certificate = ({ certificate}) => {
  if (!certificate) return null;
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
const todayDate = formatDate(new Date());
    const handleDownloadPDF = async () => {
        // Create a new jsPDF document in landscape orientation
        const doc = new jsPDF('landscape');
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const compressImage = (src, quality) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                // Fill the canvas with white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = reject;
          });
      };

      const frameImg = await compressImage(frame, 0.6);
      const imgLeft = await compressImage(logo, 0.6);
      const imgRight = await compressImage(medal, 0.6);
      const bookbotom = await compressImage(book, 0.6);
      const librarypng= await compressImage(libraryImg, 0.6);
        // Add the frame image to the background
        // const frameImg = new Image();
        // frameImg.src = frame;
        doc.getFillColor('#ffffff');
        doc.addImage(frameImg, 'PNG', 0, 0, pageWidth, pageHeight);

        // Add the logo to the PDF
        // const imgLeft = new Image();
        // imgLeft.src = logo;
        doc.addImage(imgLeft, 'PNG', 25, 25, 40, 40);  // Adjust the size and position as needed
        doc.addImage(bookbotom, 'PNG', pageWidth - 65, 140, 40, 40);
        doc.addImage(librarypng, 'PNG', 25, 140, 50, 50); 
        // Add the right logo to the PDF
        // const imgRight = new Image();
        // imgRight.src = medal;
        doc.addImage(imgRight, 'PNG', pageWidth - 65, 25, 40, 57.93);  // Adjust the size and position as needed
        doc.addFileToVFS('LCALLIG.ttf', callAddFont);
        doc.addFont('LCALLIG.ttf', 'LCALLIG', 'normal');
        // Add the certificate content
        doc.setFont('LCALLIG', 'normal');
        doc.setFontSize(50);
        doc.text('CERTIFICATE', pageWidth / 2, 50, null, null, 'center');
        doc.setFontSize(20);
        doc.text('OF Library Entry', pageWidth / 2, 60, null, null, 'left');
        
        doc.addFileToVFS('Body_Font.ttf', Bodyfont);
        doc.addFont('Body_Font.ttf', 'Body_Font', 'normal');
        // Add the certificate content
        doc.setFont('Body_Font', 'normal');
        doc.setFontSize(15);
        doc.text('This certificate is proudly presented to', pageWidth / 2, 90, null, null, 'center');

        doc.addFileToVFS('Font_Name.ttf', fontname);
        doc.addFont('Font_Name.ttf', 'Font_Name', 'normal');
        // Add the certificate content
        doc.setFont('Font_Name', 'normal');
        doc.setFontSize(60);
        doc.setTextColor(210,162,8);
        doc.text(certificate.StuName, pageWidth / 2, 110, null, null, 'center');
        doc.setTextColor(0,0,0);
        doc.setFontSize(15);
        doc.setFont('Body_Font', 'normal');
        doc.text(`For library entry of Svay Rieng University for a total of ${certificate.TotalHour} hours`, pageWidth / 2, 130, null, null, 'center');
        doc.text(`Held at SRU on ${todayDate}`, pageWidth / 2, 140, null, null, 'center');
        doc.setFontSize(15);
        doc.text('Prom Chanthan', pageWidth / 2, 180, null, null, 'center');
        doc.text('Director Of Library', pageWidth / 2, 190, null, null, 'center');

        // Save the PDF with the filecertificate.StuId as the inputted certificate.StuId
        doc.save(`${certificate.StuId}-certificate.pdf`);
    };

    return (
    <button onClick={handleDownloadPDF} class="bg-base-100 hover:bg-neutral text-accent font-bold py-2 px-4 rounded inline-flex items-center">
    <svg className=" fill-accent p-0 w-4 h-4 mr-2" viewBox="0 0 1920.00 1920.00" xmlns="http://www.w3.org/2000/svg" stroke-width="36.480000000000004"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m0 1016.081 409.186 409.073 79.85-79.736-272.867-272.979h1136.415V959.611H216.169l272.866-272.866-79.85-79.85L0 1016.082ZM1465.592 305.32l315.445 315.445h-315.445V305.32Zm402.184 242.372-329.224-329.11C1507.042 187.07 1463.334 169 1418.835 169h-743.83v677.647h112.94V281.941h564.706v451.765h451.765v903.53H787.946V1185.47H675.003v564.705h1242.353V667.522c0-44.498-18.07-88.207-49.581-119.83Z" fill-rule="evenodd"></path> </g></svg>
      <span>Export</span>
    </button>
    );
};

export default Certificate;
