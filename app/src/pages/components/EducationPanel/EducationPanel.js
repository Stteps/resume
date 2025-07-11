import React from "react";

import centraleSupelecLogo from "~/assets/images/centralesupelec-logo.png";
import iutCoteDAzurLogo from "~/assets/images/iut-cotedazur-logo.png";


const EducationPanel = () => {
    return <>
    <div className = "py-3 px-4 fs-1">
            <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-mortarboard-fill"></i>&nbsp;Formation</div>
            <div className = "row py-3">
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100" src = { centraleSupelecLogo } /></div>
                <div className = "col-2 d-flex align-items-center justify-content-center text-end fs-2">2016 -<br/>2019</div>
                <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <div>Ingénieur Supélec | CentraleSupélec - Gif-sur-Yvette, Metz</div>
                    <p className = 'fs-3'>Majeure Systèmes Interactifs & Robotique (SIR)</p>
                    <p className = 'fs-3'>Alternance à Thales DMS, Sophia Antipolis</p>
                </div>
            </div>
            <div className = "row py-3">
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { iutCoteDAzurLogo } /></div>
                <div className = "col-2 d-flex align-items-center justify-content-center text-end fs-2">2014 -<br/>2016</div>
                <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <div>Diplôme Universitaire de Technologie (DUT) | IUT Nice Côte D&apos;Azur - Nice</div>
                    <p className = 'fs-3'>Génie Electrique & Informatique Industrielle (GEII)</p>
                    <p className = 'fs-3'>Stage de fin d&apos;études à STMicroelectronics, Sophia Antipolis</p>
                </div>
            </div>
            <div className = "row py-3">
                <div className = "col-2 d-flex align-items-center justify-content-center"></div>
                <div className = "col-2 d-flex align-items-center justify-content-center text-end fs-2">2013</div>
                <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <div>Baccalauréat Général | Lycée Auguste Renoir - Cagnes-sur-Mer</div>
                    <p className = 'fs-3'>Filière Scientifique (S), option Informatique & Science du Numérique (ISN)</p>
                    <p className = 'fs-3'>Mention Assez Bien</p>
                </div>
            </div>
        </div>
    </>;
};

export default EducationPanel;