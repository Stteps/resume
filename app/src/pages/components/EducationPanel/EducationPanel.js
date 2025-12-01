import React from "react";
import { useTranslation } from 'react-i18next';

import centraleSupelecLogo from "~/assets/images/centralesupelec-logo.png";
import iutCoteDAzurLogo from "~/assets/images/iut-cotedazur-logo.png";
import academieNiceLogo from "~/assets/images/academie-nice-logo.png";


const EducationPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/EducationPanel"]);
    
    return <>
    <div className = "py-3 px-4 fs-1">
            <div className = "display-3 text-center">{ t("Index/EducationPanel:title") }</div>
            <div className = "row py-3">
                <div className = "col-2 border border-top-0 border-start-0 border-end-3 border-bottom-0 border-white d-flex justify-content-center align-items-center text-center">
                    <div className = "fs-1">2016<br/><i className = "bi bi-caret-down-fill" /><br/>2019</div>
                </div>
                <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <h2 className = "text-primary">{ t("Index/EducationPanel:first-item.title") }</h2>
                    <h3 className = "fw-bold">{ t("Index/EducationPanel:first-item.location") }</h3>
                    <p className = 'fs-3'>{ t("Index/EducationPanel:first-item.text1") }</p>
                    <p className = 'fs-4'>{ t("Index/EducationPanel:first-item.text2") }</p>
                </div>
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100" src = { centraleSupelecLogo } /></div>
            </div>
            <div className = "row py-3">
                <div className = "col-2 border border-top-0 border-start-0 border-end-3 border-bottom-0 border-white d-flex justify-content-center align-items-center text-center">
                    <div className = "fs-1">2014<br/><i className = "bi bi-caret-down-fill" /><br/>2016</div>
                </div>
                <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <h2 className = "text-primary">{ t("Index/EducationPanel:second-item.title") }</h2>
                    <h3 className = "fw-bold">{ t("Index/EducationPanel:second-item.location") }</h3>
                    <p className = 'fs-3'>{ t("Index/EducationPanel:second-item.text1") }</p>
                    <p className = 'fs-4'>{ t("Index/EducationPanel:second-item.text2") }</p>
                </div>
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { iutCoteDAzurLogo } /></div>
            </div>
            <div className = "row py-3">
                <div className = "col-2 border border-top-0 border-start-0 border-end-3 border-bottom-0 border-white d-flex justify-content-center align-items-center text-center">
                    <div className = "fs-1">2013</div>
                </div>
                <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                    <h2 className = "text-primary">{ t("Index/EducationPanel:third-item.title") }</h2>
                    <h3 className = "fw-bold">{ t("Index/EducationPanel:third-item.location") }</h3>
                    <p className = 'fs-3'>{ t("Index/EducationPanel:third-item.text1") }</p>
                    <p className = 'fs-4'>{ t("Index/EducationPanel:third-item.text2") }</p>
                </div>
                <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { academieNiceLogo } /></div>
            </div>
        </div>
    </>;
};

export default EducationPanel;