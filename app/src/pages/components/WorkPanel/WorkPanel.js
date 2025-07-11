import React from "react";

import _3iaLogo from "~/assets/images/3ia-logo.png";
import inriaLogo from "~/assets/images/inria-logo.png";
import dataCorpLogo from "~/assets/images/datacorp-logo.png";

const WorkPanel = () => {
    return <div className = "py-3 px-4 fs-1">
        <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-briefcase-fill"></i>&nbsp;Experience professionnelle</div>
        <div className = "row py-3">
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100" src = { _3iaLogo } /></div>
            <div className = "col-2 d-flex align-items-center justify-content-center text-end fs-2">Mars 2023 -<br/>En cours</div>
            <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <div>Ingénieur Full-Stack | 3IA Côte d&apos;Azur – Sophia Antipolis</div>
                <p className = 'fs-3'>
                    Développement de démonstrateurs logiciels et contribution à des projets de recherches en Data Science & IA.
                </p>
                <p className = 'fs-3'>
                    <span className = "fw-bold">Stack: </span>Django, Flask, React, Python, JavaScript, C++, NLP, Computer Vision, Clustering, Data Science, IA
                </p>
            </div>
        </div>
        <div className = "row py-3">
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { inriaLogo } /></div>
            <div className = "col-2 d-flex align-items-center justify-content-center text-end fs-2">Mars 2021 -<br/>Février 2023</div>
            <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <div>Ingénieur Logiciel IA | INRIA – Sophia Antipolis</div>
                <p className = 'fs-3'>Développement d&apos;un logiciel de clustering de réseaux de communications</p>
                <p className = 'fs-3'>
                    <span className = "fw-bold">Stack: </span>Django, React, Python, JavaScript, Cython, scikit-learn, NLP, Clustering, Data Science, IA
                </p>
            </div>
        </div>
        <div className = "row py-3">
            <div className = "col-2 d-flex align-items-center justify-content-center"><img className = "w-100 p-3" src = { dataCorpLogo } /></div>
            <div className = "col-2 d-flex align-items-center justify-content-center text-end fs-2">Février 2020 -<br/>Juin 2020</div>
            <div className = "col-8 border border-top-0 border-start-3 border-end-0 border-bottom-0 border-white">
                <div>Ingénieur Big Data | Datacorp Innovation – Sophia Antipolis</div>
                <p className = 'fs-3'>
                    Contribution au développement et à l’industrialisation d’un outil d’aide à la décision pour les analystes des compagnies aeriennes
                </p>
                <p className = 'fs-3'>
                    <span className = "fw-bold">Stack: </span>Angular, Karma, Hadoop/Spark, JavaScript, Scala, Équipe Agile Scum
                </p>
            </div>
        </div>
    </div>;
};

export default WorkPanel;