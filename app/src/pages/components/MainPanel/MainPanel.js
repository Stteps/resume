import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import selfPicture from "~/assets/images/self.jpg";


const MainPanel = (props) => {
    const { t, i18n } = useTranslation(["common", "glossary", "Index/MainPanel"]);

    const [textTyped, setTextTyped] = useState();

    const typewriteRef = useRef();

    useEffect(() => {
        if (!i18n.isInitialized || !typewriteRef.current)
            return;

        const fullText = t("Index/MainPanel:subtitle");
        let currentIndex = 0;

        const tick = () => {
            currentIndex += 1;
            setTextTyped(fullText.substring(0, currentIndex));
            if (currentIndex < fullText.length) {
                setTimeout(tick, 100 - Math.min(Math.random() * 100, 50));
            } else {
                if (typewriteRef.current) {
                    const span = typewriteRef.current.querySelector(".wrap");
                    if (span)
                        span.style.borderRight = "0.08em solid transparent";
                }
            }
        };

        tick();
    }, [i18n.isInitialized, t]);

    return <div className = "text-center">
        <img className = "rounded-circle pe-none" src = { selfPicture } height = { 450 } />
        <div className = "my-3">
            <h1 className = "display-1">Stéphane Petiot</h1>
            <h2 className = "display-4">{ t("Index/MainPanel:title") }</h2>
            <h4 className = "display-6"><i className = "bi bi-geo-alt-fill"></i> Nice, France</h4>
        </div>
        <div className = "d-flex justify-content-center display-6 my-5">
            <a
                className = "external-link position-relative mx-4"
                onPointerDown = {() => { window.open('mailto:stephane.petiot@hotmail.fr?subject=Contact&body=Bonjour%20Stéphane,', '_self'); }}
                onMouseDown = { props.resetControls }
                href = "mailto:stephane.petiot@hotmail.fr?subject=Contact&body=Bonjour%20Stéphane,"
                target = "_self"
            >
                <span className = "external-link-label fs-5">{ t("glossary:Email") }</span>
                <span className = 'bi bi-at'></span>
            </a>
            <a
                className = "external-link position-relative mx-4"
                onPointerDown = {() => { window.open('https://www.linkedin.com/in/stephanepetiot/', 'blank'); }}
                onMouseDown = { props.resetControls }
                href = 'https://www.linkedin.com/in/stephanepetiot/'
                target = "blank"
            >
                <span className = "external-link-label fs-5">{ t("glossary:LinkedIn") }</span>
                <span className = 'bi bi-linkedin'></span>
            </a>
            <a
                className = "external-link position-relative mx-4"
                onPointerDown = {() => { window.open('https://github.com/stteps', 'blank'); }}
                onMouseDown = { props.resetControls }
                href = 'https://github.com/stteps'
                target = "blank"
            >
                <span className = "external-link-label fs-5">{ t("glossary:GitHub") }</span>
                <span className = 'bi bi-github'></span>
            </a>
        </div>
        <h4 ref = { typewriteRef } className = "display-5 typewrite">
            <span className = "wrap">{ textTyped }</span>
        </h4>
    </div>;
};

MainPanel.propTypes = {
    resetControls: PropTypes.func,
};

export default MainPanel;