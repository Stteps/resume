import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import reactIcon from "~/assets/icons/react.png";
import angularIcon from "~/assets/icons/angular.png";
import bootstrapIcon from "~/assets/icons/bootstrap.png";
import sassIcon from "~/assets/icons/sass.png";
import javascriptIcon from "~/assets/icons/javascript.png";
import typescriptIcon from "~/assets/icons/typescript.png";
import htmlIcon from "~/assets/icons/html.png";
import cssIcon from "~/assets/icons/css.png";
import echartsIcon from "~/assets/icons/echarts.png";
import d3Icon from "~/assets/icons/d3-js.png";
import threeJsIcon from "~/assets/icons/three-js.png";
import djangoIcon from "~/assets/icons/django.svg";
import flaskIcon from "~/assets/icons/flask.png";
import pythonIcon from "~/assets/icons/python.svg";
import sqlIcon from "~/assets/icons/sql.png";
import postgresqlIcon from "~/assets/icons/postgresql.png";
import redisIcon from "~/assets/icons/redis.png";
import sqliteIcon from "~/assets/icons/sqlite.png";
import dockerIcon from "~/assets/icons/docker.webp";
import webpackIcon from "~/assets/icons/webpack.png";
import nginxIcon from "~/assets/icons/nginx.png";
import cmakeIcon from "~/assets/icons/cmake.png";
import cythonIcon from "~/assets/icons/cython.png";
import cPlusPlusIcon from "~/assets/icons/c-plus-plus.png";
import cSharpIcon from "~/assets/icons/c-sharp.png";
import ovhCloudIcon from "~/assets/icons/ovhcloud.webp";
import godotIcon from "~/assets/icons/godot.png";
import unityIcon from "~/assets/icons/unity.png";
import ubuntuIcon from "~/assets/icons/ubuntu.png";
import fedoraIcon from "~/assets/icons/fedora.png";
import windowsIcon from "~/assets/icons/windows.png";
import vsCodeIcon from "~/assets/icons/vs-code.png";
import AutoScroller from "~/shared/components/AutoScroller/AutoScroller";


const SkillsPanel = () => {
    const { t } = useTranslation(["common", "glossary", "Index/SkillsPanel"]);

    useEffect(() => { $(".skill-fill").css("max-width", "100px"); }, []);

    const FRONTEND_SKILLS = [
        {
            label: t("glossary:Frameworks"),
            items: [
                { name: "React", level: 90, icon: reactIcon },
                { name: "Angular", level: 20, icon: angularIcon },
            ],
        },
        {
            label: t("glossary:Languages"),
            items: [
                { name: "JavaScript", level: 90, icon: javascriptIcon },
                { name: "HTML", level: 90, icon: htmlIcon },
                { name: "JSX", level: 90, icon: reactIcon },
                { name: "CSS", level: 90, icon: cssIcon },
                { name: "SCSS", level: 70, icon: sassIcon },
                { name: "TypeScript", level: 30, icon: typescriptIcon },
            ],
        },
        {
            label: t("glossary:Styling"),
            items: [
                { name: "Bootstrap", level: 80, icon: bootstrapIcon },
                { name: "SASS", level: 70, icon: sassIcon },
            ]
        },
        {
            label: t("glossary:Dataviz-3D"),
            items: [
                { name: "Echarts", level: 80, icon: echartsIcon },
                { name: "three.js", level: 60, icon: threeJsIcon },
                { name: "D3.js", level: 20, icon: d3Icon },
            ]
        }
    ];

    const BACKEND_SKILLS = [
        {
            label: t("glossary:Frameworks"),
            items: [
                { name: "Django", level: 90, icon: djangoIcon },
                { name: "Flask", level: 20, icon: flaskIcon },
            ],
        },
        {
            label: t("glossary:Languages"),
            items: [
                { name: "Python", level: 90, icon: pythonIcon },
                { name: "SQL", level: 40, icon: sqlIcon },
            ],
        },
        {
            label: t("glossary:Databases"),
            items: [
                { name: "PostgreSQL", level: 80, icon: postgresqlIcon },
                { name: "Redis", level: 40, icon: redisIcon },
                { name: "SQLite", level: 20, icon: sqliteIcon },
            ]
        },
        {
            label: t("glossary:Servers"),
            items: [
                { name: "NGINX", level: 70, icon: nginxIcon },
            ]
        }
    ];

    const OTHER_SKILLS = [
        {
            label: t("glossary:Deployment-Build"),
            items: [
                { name: "Docker", level: 90, icon: dockerIcon },
                { name: "Webpack", level: 80, icon: webpackIcon },
                { name: "CMake", level: 30, icon: cmakeIcon },
            ],
        },
        {
            label: t("glossary:Languages"),
            items: [
                { name: "Cython", level: 60, icon: cythonIcon },
                { name: "GDScript", level: 50, icon: godotIcon },
                { name: "C++", level: 50, icon: cPlusPlusIcon },
                { name: "C#", level: 30, icon: cSharpIcon },
            ],
        },
        {
            label: t("glossary:Hosting-Cloud"),
            items: [
                { name: "OVHCloud", level: 30, icon: ovhCloudIcon },
            ],
        },
        {
            label: t("glossary:Gamedev"),
            items: [
                { name: "Godot", level: 50, icon: godotIcon },
                { name: "Unity", level: 30, icon: unityIcon },
            ],
        },
        {
            label: t("glossary:OS"),
            items: [
                { name: "Ubuntu", level: 80, icon: ubuntuIcon },
                { name: "Windows", level: 60, icon: windowsIcon },
                { name: "Fedora", level: 40, icon: fedoraIcon },
            ],
        },
        {
            label: t("glossary:IDEs"),
            items: [
                { name: "VS Code", level: 80, icon: vsCodeIcon },
            ],
        },
    ];

    const fillColor = (level) => {
        const clamped = Math.max(0, Math.min(100, level));

        if (clamped <= 50) {
            const t = clamped / 50;
            const r = Math.round(244 + t * (250 - 244));  // 244 → 250
            const g = Math.round(63 + t * (204 - 63));    // 63 → 204
            const b = Math.round(94 + t * (21 - 94));     // 94 → 21
            return `linear-gradient(to right, rgb(${r}, ${g}, ${b}), rgb(${r}, ${g}, ${b}))`;
        } else {
            const t = (clamped - 50) / 50;
            const r = Math.round(250 + t * (34 - 250));   // 250 → 34
            const g = Math.round(204 + t * (197 - 204));  // 204 → 197
            const b = Math.round(21 + t * (94 - 21));     // 21 → 94
            return `linear-gradient(to right, rgb(${r}, ${g}, ${b}), rgb(${r}, ${g}, ${b}))`;
        }
    };

    return <div className = "py-3 px-4 fs-1">
        <div className = "display-3 text-center">{ t("Index/SkillsPanel:title") }</div>
        <AutoScroller delayBeforeScroll = { 4000 } delayAtBottom = { 4000 } scrollSpeed = { 1 } fadeDuration = { 500 } height = { 750 }>
            <div className = "row fs-4 my-3">
                <div className = "col-2 fs-3 d-flex justify-content-center align-items-center">{ t("glossary:Frontend") }</div>
                <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-3 border-white d-flex flex-wrap row pb-1">
                    {
                        FRONTEND_SKILLS.map((category) => (
                            <div className = "col-3 px-3 my-2" key = { category.label }>
                                <div className = "fw-bold text-nowrap">{ category.label }</div>
                                {
                                    category.items.map((item) => (
                                        <div key = { item.name } className = "skill-item d-flex align-items-center row">
                                            <img className = "col-2" src = { item.icon } height = { 30 } />
                                            <span className = "col-6 skill-label">{ item.name }</span>
                                            <span className = "col-4 skill-bar border p-0">
                                                <div className = "skill-fill" style = {{ width: `${ item.level }%`, backgroundImage: fillColor(item.level) }} />
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className = "row fs-4 my-3">
                <div className = "col-2 fs-3 d-flex justify-content-center align-items-center">{ t("glossary:Backend") }</div>
                <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-3 border-white d-flex flex-wrap row pb-1">
                    {
                        BACKEND_SKILLS.map((category) => (
                            <div className = "col-3 px-3 my-2" key = { category.label }>
                                <div className = "fw-bold text-nowrap">{ category.label }</div>
                                {
                                    category.items.map((item) => (
                                        <span key = { item.name } className = "skill-item d-flex align-items-center row">
                                            <img className = "col-2" src = { item.icon } height = { 30 } />
                                            <span className = "col-6 skill-label">{ item.name }</span>
                                            <span className = "col-4 skill-bar border p-0">
                                                <div className = "skill-fill" style = {{ width: `${ item.level }%`, backgroundImage: fillColor(item.level) }} />
                                            </span>
                                        </span>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className = "row fs-4 my-3">
                <div className = "col-2 fs-3 d-flex justify-content-center align-items-center">{ t("glossary:Miscellaneous") }</div>
                <div className = "col-10 border border-top-0 border-start-3 border-end-0 border-bottom-3 border-white d-flex flex-wrap row pb-1">
                    {
                        OTHER_SKILLS.map((category) => (
                            <div className = "col-3 px-3 my-2" key = { category.label }>
                                <div className = "fw-bold text-nowrap">{ category.label }</div>
                                {
                                    category.items.map((item) => (
                                        <span key = { item.name } className = "skill-item d-flex align-items-center row">
                                            <img className = "col-2" src = { item.icon } height = { 30 } />
                                            <span className = "col-6 skill-label">{ item.name }</span>
                                            <span className = "col-4 skill-bar border p-0">
                                                <div className = "skill-fill" style = {{ width: `${ item.level }%`, backgroundImage: fillColor(item.level) }} />
                                            </span>
                                        </span>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </AutoScroller>
    </div>;
};

export default SkillsPanel;