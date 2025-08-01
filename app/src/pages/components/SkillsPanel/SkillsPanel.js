import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getGradient } from "~/pages/utils";

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
import linuxIcon from "~/assets/icons/linux.png";
import windowsIcon from "~/assets/icons/windows.png";
import vsCodeIcon from "~/assets/icons/vs-code.png";



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
                { name: "Apache Echarts", level: 80, icon: echartsIcon },
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
                { name: "Linux (Ubuntu/Fedora)", level: 80, icon: linuxIcon },
                { name: "Windows", level: 60, icon: windowsIcon },
            ],
        },
        {
            label: t("glossary:IDEs"),
            items: [
                { name: "VS Code", level: 80, icon: vsCodeIcon },
            ],
        },
    ];

    return <div className = "py-3 px-4 fs-1">
        <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-tools"></i>&nbsp;{ t("Index/SkillsPanel:title") }</div>
        <div className = "fs-4 mt-3 mb-4 text-center">
            <h3 className = "mt-4 fs-3">{ t("glossary:Frontend") }</h3>
            {
                FRONTEND_SKILLS.map((category) => (
                    <div className = "d-flex align-items-center my-2 px-3" key = { category.label }>
                        <span className = "fw-bold text-nowrap">{ category.label }</span>&emsp;
                        <span className = "flex-grow-1 d-flex align-items-center flex-wrap">
                            {
                                category.items.map((item) => (
                                    <span key = { item.name } className = "skill-item d-flex align-items-center mx-3">
                                        <img className = "float-start" src = { item.icon } height = { 30 } />
                                        <span className = "skill-label mx-2">{ item.name }</span>
                                        <span className = "skill-bar bg-light">
                                            <div className = "skill-fill" style = {{ width: `${ item.level }%`, backgroundImage: getGradient(item.level) }} />
                                        </span>
                                    </span>
                                ))
                            }
                        </span>
                    </div>
                ))
            }
            <h3 className = "mt-4 fs-3">{ t("glossary:Backend") }</h3>
            {
                BACKEND_SKILLS.map((category) => (
                    <div className = "d-flex align-items-center my-2 px-3" key = { category.label }>
                        <span className = "fw-bold text-nowrap">{ category.label }</span>&emsp;
                        <span className = "flex-grow-1 d-flex align-items-center flex-wrap">
                            {
                                category.items.map((item) => (
                                    <span key = { item.name } className = "skill-item d-flex align-items-center mx-3">
                                        <img className = "float-start" src = { item.icon } height = { 30 } />
                                        <span className = "skill-label mx-2">{ item.name }</span>
                                        <span className = "skill-bar bg-light">
                                            <div
                                                className = "skill-fill"
                                                style = {{
                                                    width: `${ item.level }%`,
                                                    backgroundImage: getGradient(item.level),
                                                }}
                                            />
                                        </span>
                                    </span>
                                ))
                            }
                        </span>
                    </div>
                ))
            }
            <h3 className = "mt-4 fs-3">{ t("glossary:Miscellaneous") }</h3>
            <div className = "row">
                {
                    OTHER_SKILLS.slice(0, 5).map((category) => (
                        <div className = "col-6 d-flex align-items-center my-2 px-3" key = { category.label }>
                            <span className = "fw-bold text-nowrap">{ category.label }</span>
                            <span className = "flex-grow-1 d-flex align-items-center flex-wrap">
                                {
                                    category.items.map((item) => (
                                        <span key = { item.name } className = "skill-item d-flex align-items-center mx-3">
                                            <img className = "float-start" src = { item.icon } height = { 30 } />
                                            <span className = "skill-label mx-2">{ item.name }</span>
                                            <span className = "skill-bar bg-light">
                                                <div className = "skill-fill" style = {{ width: `${ item.level }%`, backgroundImage: getGradient(item.level) }} />
                                            </span>
                                        </span>
                                    ))
                                }
                            </span>
                        </div>
                    ))
                }
                {
                    OTHER_SKILLS.slice(5).map((category) => (
                        <div className = "col-6 d-flex align-items-center my-2 px-3" key = { category.label }>
                            <span className = "fw-bold text-nowrap">{ category.label }</span>
                            <span className = "flex-grow-1 d-flex align-items-center flex-wrap">
                                {
                                    category.items.map((item) => (
                                        <span key = { item.name } className = "skill-item d-flex align-items-center mx-3">
                                            <img className = "float-start" src = { item.icon } height = { 30 } />
                                            <span className = "skill-label mx-2">{ item.name }</span>
                                            <span className = "skill-bar bg-light">
                                                <div className = "skill-fill" style = {{ width: `${ item.level }%`, backgroundImage: getGradient(item.level) }} />
                                            </span>
                                        </span>
                                    ))
                                }
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>;
};

export default SkillsPanel;