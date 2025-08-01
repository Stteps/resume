import React from "react";
import { useTranslation } from "react-i18next";

import _3iaLogo from "~/assets/images/3ia-logo.png";
import inriaLogo from "~/assets/images/inria-logo.png";
import dataCorpLogo from "~/assets/images/datacorp-logo.png";

const WorkPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/WorkPanel"]);

    return <div className = "py-3 px-4 fs-1">
        <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-briefcase-fill"></i>&nbsp;{ t("Index/WorkPanel:title") }</div>
        <div className = "row py-3">
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100" src = { _3iaLogo } /></div>
            <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <div>
                    <span className = "text-primary">{ t("Index/WorkPanel:first-item.title") }</span>&emsp;<span className="fs-5">{ t("glossary:March") } 2023 - { t("glossary:Present") }</span>
                </div>
                <p className = 'fs-3'>{ t("Index/WorkPanel:first-item.text") }</p>
                <p className = 'fs-5'>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Django</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Flask</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">React</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Python</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">JavaScript</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">C++</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Linux</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Docker</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">NGINX</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">NLP</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Computer Vision</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Clustering</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Data Science</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">IA</span>
                </p>
            </div>
        </div>
        <div className = "row py-3">
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { inriaLogo } /></div>
            <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <div>
                    <span className = "text-primary">{ t("Index/WorkPanel:second-item.title") }</span>&emsp;<span className="fs-5">{ t("glossary:March") } 2021 - { t("glossary:February") } 2023</span>
                </div>
                <p className = 'fs-3'>{ t("Index/WorkPanel:second-item.text") }</p>
                <p className = 'fs-5'>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Django</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">React</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Python</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">JavaScript</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">C++</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Cython</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Linux</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Docker</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">NGINX</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">NLP</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Clustering</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Data Science</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">IA</span>
                </p>
            </div>
        </div>
        <div className = "row py-3">
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { dataCorpLogo } /></div>
            <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <div>
                    <span className = "text-primary">{ t("Index/WorkPanel:third-item.title") }</span>&emsp;<span className="fs-5">{ t("glossary:February") } 2020 - { t("glossary:June") } 2020</span>
                </div>
                <p className = 'fs-3'>{ t("Index/WorkPanel:third-item.text") }</p>
                <p className = 'fs-5'>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Angular</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Karma</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Hadoop/Spark</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">JavaScript</span>
                    <span className = "border border-light border-2 border-light rounded-pill px-2 mx-2 text-nowrap">Scala</span>
                </p>
            </div>
        </div>
    </div>;
};

export default WorkPanel;