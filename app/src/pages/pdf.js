import "jquery/dist/jquery";
import '@popperjs/core/dist/esm/popper';
import "bootstrap/dist/js/bootstrap.bundle";

import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

import "./i18n";
import PdfApp from './containers/PdfApp';

import "bootstrap-icons/font/bootstrap-icons.min.css";

import "~/scss/main.scss";
import "~/scss/pages/pdf.scss";


$(() => {
    async function generatePDF() {
        const rootEl = document.getElementById("hidden-content");

        // Render React markup into hidden container
        createRoot(rootEl).render(<PdfApp />);

        // Wait for rendering & fonts
        await new Promise(r => setTimeout(r, 150));

        const canvas = await html2canvas(rootEl, { scale: 2 });
        const img = canvas.toDataURL("image/png");

        const pdf = new jsPDF({ unit: "pt", format: "a4" });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const ratio = pageWidth / canvas.width;
        const imgHeight = canvas.height * ratio;

        pdf.addImage(img, "PNG", 0, 0, pageWidth, imgHeight, "", "FAST");
        pdf.setProperties({ title: "Stéphane PETIOT - Full-Stack Software Engineer" });

        pdf.output('pdfobjectnewwindow', { filename: "Stephane_PETIOT_Full_Stack_Software_Engineer.pdf" });
        window.close();
    }

    generatePDF();
});

