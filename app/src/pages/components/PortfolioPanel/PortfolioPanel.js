import React from "react";
import PropTypes from "prop-types";
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


const PortfolioPanel = (props) => {
    const { t } = useTranslation(["common", "glossary", "Index/PortfolioPanel"]);

    return <div className = "py-3 px-4 fs-3">
        <div className = "display-3 text-center">{ t("Index/PortfolioPanel:title") }</div>
        <div className = "d-flex flex-wrap justify-content-evenly align-items-center my-3 text-center">
            {
                PORTFOLIO.map((item, i) => (
                    <figure key = { i } className = "portfolio-item position-relative">
                        <img src = { item.picture } className = "my-2" height = { 250 } />
                        <figcaption>
                            <a
                                className = "stretched-link link-light"
                                onPointerDown = { () => { window.open(item.url, 'blank'); } }
                                onMouseDown = { props.resetControls }
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

PortfolioPanel.propTypes = {
    resetControls: PropTypes.func,
};

export default PortfolioPanel;