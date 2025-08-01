import React from "react";
import { useTranslation } from "react-i18next";

import _3iaDemosPicture from "~/assets/images/3ia-demos.png";
import magiStudioPicture from "~/assets/images/magistudio.png";

const PORTFOLIO = [
    {
        caption: "3IA-Demos",
        url: "https://3ia-demos.inria.fr",
        picture: _3iaDemosPicture,
        tags: ["Django", "Flask", "React", "Bootstrap", "Apache Echarts", "Docker", "NGINX"]
    },
    {
        caption: "Magi Studio",
        url: "https://studiomagi.maho-editions.com",
        picture: magiStudioPicture,
        tags: ["Django", "React", "Bootstrap", "Docker", "NGINX"]
    },
];


const PortfolioPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/PortfolioPanel"]);

    return <div className = "py-3 px-4 fs-3">
        <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-code-slash"></i>&nbsp;{ t("Index/PortfolioPanel:title") }</div>
        <div className = "d-flex flex-wrap justify-content-evenly align-items-center my-3 text-center">
            {
                PORTFOLIO.map((item, i) => (
                    <figure key = { i } className = "portfolio-item position-relative">
                        <img src = { item.picture } className = "my-2" height = { 250 } />
                        <figcaption>
                            <a
                                className = "stretched-link link-light"
                                onPointerDown = {() => { window.open(item.url, 'blank'); }}
                                href = { item.url }
                                target = "blank"
                            >
                                { item.caption }
                            </a>
                            <small className = "d-block fs-5">
                                {
                                    item.tags.map((tag, i) => (
                                        <span key = { i }>
                                            { `${tag}${(i + 1) < item.tags.length ? ", " : ""}` }
                                        </span>
                                    ))
                                }</small>
                        </figcaption>
                    </figure>
                ))
            }
        </div>
    </div>;
};

export default PortfolioPanel;