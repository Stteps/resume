import React from "react";
import { useTranslation } from "react-i18next";

import _3iaLogo from "~/assets/images/3ia-logo.png";
import inriaLogo from "~/assets/images/inria-logo.png";
import dataCorpLogo from "~/assets/images/datacorp-logo.png";

const WorkPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/WorkPanel"]);

    return <div className = "py-3 px-4 fs-1">
        <div className = "display-3 text-center">{ t("Index/WorkPanel:title") }</div>
        <div className = "row py-3">
            <div className = "col-2 border border-top-0 border-start-0 border-end-3 border-bottom-0 border-white d-flex justify-content-center align-items-center text-center">
                <div className = "fs-2">{ t("glossary:March") } 2023<br/><i className = "bi bi-caret-down-fill"/><br/>{ t("glossary:Present") }</div>
            </div>
            <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <h2 className = "text-primary">{ t("Index/WorkPanel:first-item.title") }</h2>
                <h3 className = "fw-bold">{ t("Index/WorkPanel:first-item.location") }</h3>
                <p className = 'fs-4'>{ t("Index/WorkPanel:first-item.text") }</p>
                <p className = 'fs-5 d-flex flex-wrap'>
                    {
                        Array.from(["Django", "Flask", "React", "Python", "JavaScript", "Docker", "NGINX", "NLP", "Computer Vision", "Clustering", "Data Science", "AI"]).map((item, i) => {
                            return <span key = { i } className = "tag rounded-pill px-2 my-1 me-2 text-nowrap">{ item }</span>; 
                        })
                    }
                </p>
            </div>
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100" src = { _3iaLogo } /></div>
        </div>
        <div className = "row py-3">
            <div className = "col-2 border border-top-0 border-start-0 border-end-3 border-bottom-0 border-white d-flex justify-content-center align-items-center text-center">
                <div className = "fs-2">{ t("glossary:March") } 2021<br/><i className = "bi bi-caret-down-fill" /><br/>{ t("glossary:February") } 2023</div>
            </div>
            <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <h2 className = "text-primary">{ t("Index/WorkPanel:second-item.title") }</h2>
                <h3 className = "fw-bold">{ t("Index/WorkPanel:second-item.location") }</h3>
                <p className = 'fs-4'>{ t("Index/WorkPanel:second-item.text") }</p>
                <p className = 'fs-5 d-flex flex-wrap'>
                    {
                        Array.from(["Django", "React", "Python", "JavaScript", "C++", "Cython", "Docker", "NGINX", "NLP", "Clustering", "Data Science", "AI"]).map((item, i) => {
                            return <span key = { i } className = "tag rounded-pill px-2 my-1 me-2 text-nowrap">{ item }</span>; 
                        })
                    }
                </p>
            </div>
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { inriaLogo } /></div>
        </div>
        <div className = "row py-3">
            <div className = "col-2 border border-top-0 border-start-0 border-end-3 border-bottom-0 border-white d-flex justify-content-center align-items-center text-center">
                <div className = "fs-2">{ t("glossary:February") } 2020<br/><i className = "bi bi-caret-down-fill" /><br/>{ t("glossary:June") } 2020</div>
            </div>
            <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <h2 className = "text-primary">{ t("Index/WorkPanel:third-item.title") }</h2>
                <h3 className = "fw-bold">{ t("Index/WorkPanel:third-item.location") }</h3>
                <p className = 'fs-4'>{ t("Index/WorkPanel:third-item.text") }</p>
                <p className = 'fs-5 d-flex flex-wrap'>
                    {
                        Array.from(["Angular", "Karma", "Hadoop/Spark", "JavaScript", "Scala"]).map((item, i) => {
                            return <span key = { i } className = "tag rounded-pill px-2 my-1 me-2 text-nowrap">{ item }</span>; 
                        })
                    }
                </p>
            </div>
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { dataCorpLogo } /></div>
        </div>
    </div>;
};

export default WorkPanel;