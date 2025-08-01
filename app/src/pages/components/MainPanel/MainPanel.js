import React from "react";
import { useTranslation } from "react-i18next";

import selfPicture from "~/assets/images/self.jpg";


const MainPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/MainPanel"]);

    return <div className = "text-center">
        <img className = "rounded-circle" src = { selfPicture } height = { 450 } />
        <div className = "my-3">
            <h1 className = "display-1">Stéphane Petiot</h1>
            <h2 className = "display-4">{ t("Index/MainPanel:title") }</h2>
            <h4 className = "display-6"><i className = "bi bi-geo-alt-fill"></i> Nice, France</h4>
        </div>
        <div className = "d-flex justify-content-center display-6 my-5">
            <a
                onPointerDown = {() => { window.open('mailto:stephane.petiot@hotmail.fr?subject=Contact&body=Bonjour%20Stéphane,', '_self'); }}
                className = 'bi bi-at link-light mx-4'
                href="mailto:stephane.petiot@hotmail.fr?subject=Contact&body=Bonjour%20Stéphane,"
                target = "_self"
            >
            </a>
            <a
                onPointerDown = {() => { window.open('https://www.linkedin.com/in/stephanepetiot/', 'blank'); }}
                className = 'bi bi-linkedin link-light mx-4'
                href = 'https://www.linkedin.com/in/stephanepetiot/'
                target = "blank"
            >
            </a>
            <a
                onPointerDown = {() => { window.open('https://github.com/stteps', 'blank'); }}
                className = 'bi bi-github link-light mx-4'
                href = 'https://github.com/stteps'
                target = "blank"
            >
            </a>
        </div>
        <h4 className = "display-5">{ t("Index/MainPanel:subtitle") }</h4>
    </div>;
};

export default MainPanel;