import React from "react";
import { useTranslation } from 'react-i18next';

import centraleSupelecLogo from "~/assets/images/centralesupelec-logo.png";
import iutCoteDAzurLogo from "~/assets/images/iut-cotedazur-logo.png";
import academieNiceLogo from "~/assets/images/academie-nice-logo.png";


const EducationPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/EducationPanel"]);
    
    return <>
    <div className = "py-3 px-4 fs-1">
            <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-mortarboard-fill"></i>&nbsp;{ t("Index/EducationPanel:title") }</div>
            <div className = "row py-3">
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100" src = { centraleSupelecLogo } /></div>
                <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <div>
                        <span className = "text-primary fs-2">{ t("Index/EducationPanel:first-item.title") }</span>&emsp;<span className = "fs-5">2016 - 2019</span>
                    </div>
                    <p className = 'fs-3'>{ t("Index/EducationPanel:first-item.text1") }</p>
                    <p className = 'fs-4'>{ t("Index/EducationPanel:first-item.text2") }</p>
                </div>
            </div>
            <div className = "row py-3">
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { iutCoteDAzurLogo } /></div>
                <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <div>
                        <span className = "text-primary fs-2">{ t("Index/EducationPanel:second-item.title") }</span>&emsp;<span className = "fs-5">2014 - 2016</span>
                    </div>
                    <p className = 'fs-3'>{ t("Index/EducationPanel:second-item.text1") }</p>
                    <p className = 'fs-4'>{ t("Index/EducationPanel:second-item.text2") }</p>
                </div>
            </div>
            <div className = "row py-3">
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { academieNiceLogo } /></div>
                <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <div>
                        <span className = "text-primary fs-2">{ t("Index/EducationPanel:third-item.title") }</span>&emsp;<span className = "fs-5">2013</span>
                    </div>
                    <p className = 'fs-3'>{ t("Index/EducationPanel:third-item.text1") }</p>
                    <p className = 'fs-4'>{ t("Index/EducationPanel:third-item.text2") }</p>
                </div>
            </div>
        </div>
    </>;
};

export default EducationPanel;