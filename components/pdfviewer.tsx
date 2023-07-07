import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFPreview = ({ url }) => {
  return (
    <div>
      <Document 
       file={url}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFPreview;
