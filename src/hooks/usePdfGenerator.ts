import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

export const usePdfGenerator = () => {
    const contentRef = useRef(null); // Change componentRef to contentRef

    // Function to download PDF
    const downloadPdf = async () => {
    };

    // Function to print the document
    const handlePrint = useReactToPrint({ contentRef }); // Change componentRef to contentRef

    return {
        contentRef, // Change componentRef to contentRef
        downloadPdf,
        handlePrint,
    };
};
