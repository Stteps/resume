import React from 'react';
import { useTranslation } from 'react-i18next';

import selfPicture from "~/assets/images/self-pdf.jpg";
import frIcon from "~/assets/icons/fr.svg";
import enIcon from "~/assets/icons/en.svg";
import esIcon from "~/assets/icons/es.svg";


const HEADER_BORDER_WIDTH = 8;
const STRIPE_WIDTH = 200;
const PADDING = 50;

const FRONTEND_SKILLS = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 90 },
  { name: "HTML", level: 90 },
  { name: "CSS", level: 90 },
  { name: "Bootstrap", level: 80 },
  { name: "Echarts", level: 80 },
  { name: "Webpack", level: 80 },
  { name: "SCSS", level: 70 },
];

const BACKEND_SKILLS = [
  { name: "Django", level: 90 },
  { name: "Python", level: 90 },
  { name: "Docker", level: 90 },
  { name: "PostgreSQL", level: 80 },
  { name: "NGINX", level: 70 },
  { name: "Redis", level: 40 },
  { name: "Flask", level: 20 },
];

const MISCELLANEOUS_SKILLS = [
  { name: "Cython", level: 60 },
  { name: "C++", level: 50 },
  { name: "CMake", level: 30 },
  { name: "C#", level: 30 },
];

const ENVIRONMENT_SKILLS = [
  { name: "Ubuntu", level: 80 },
  { name: "Windows", level: 60 },
  { name: "Fedora", level: 40 },
];

const PdfApp = () => {
  const { t } = useTranslation(["common", "glossary", "Pdf/PdfApp"]);

  return <>
    <div
      className = 'position-absolute bg-primary h-100 text-light px-2'
      style = {{ width: `${STRIPE_WIDTH}px`, left: `${PADDING}px`, paddingTop: "300px" }}
    >
      <div className = "text-center fw-bold mb-5">
        <p>{ t("Pdf/PdfApp:full-stack-engineer.side-panel.headline.first-paragraph") }</p>
        <p>{ t("Pdf/PdfApp:full-stack-engineer.side-panel.headline.second-paragraph") }</p>
      </div>
      <div className = "text-center mb-5">
        <div>
          <span style = {{ fontSize: "0.85rem" }}>stephane.petiot@hotmail.fr</span>
        </div>
        <div>
          <i className = 'bi bi-telephone-fill'></i>&nbsp;
          <span>+33 6 67 22 57 50</span>
        </div>
        <div>
          <i className = "bi bi-geo-alt-fill"></i>&nbsp;
          <span>{ t("Pdf/PdfApp:full-stack-engineer.side-panel.location") }</span>
        </div>
        <div className = 'd-flex justify-content-center align-items-center text-center'>
          <img className = "rounded" src = { frIcon } height = { 20 } />&nbsp;
          <span>{ t("glossary:French") }</span>
        </div>
      </div>
      <div className = "mb-5 px-1">
        <h5 className = 'fw-bold text-uppercase'>{ t("glossary:Languages") }</h5>
        <div className = 'd-flex align-items-center'>
          <img className = "rounded" src = { enIcon } height = { 20 } />&nbsp;
          <span>{ t("glossary:English") } ({ t("glossary:Fluent") })</span>
        </div>
        <div className = 'd-flex align-items-center'>
          <img className = "rounded" src = { esIcon } height = { 20 } />&nbsp;
          <span>{ t("glossary:Spanish") } ({ t("glossary:Basic") })</span>
        </div>
      </div>

      <div className = "mb-5 px-1">
        <h5 className = 'fw-bold text-uppercase'>{ t("glossary:Miscellaneous") }</h5>
        <div className = 'mb-1'>
          <div className = 'fw-bold'>{ t("glossary:Interests") }</div>
          <div>{ t("Pdf/PdfApp:full-stack-engineer.side-panel.interests.text") }</div>
        </div>
        <div className = 'mb-1'>
          <div className = 'fw-bold'>{ t("glossary:Sports") }</div>
          <div>{ t("Pdf/PdfApp:full-stack-engineer.side-panel.sports.text") }</div>
        </div>
      </div>

      <div className = "mb-5 px-1">
        <h5 className = 'fw-bold text-uppercase'>{ t("glossary:References") }</h5>
        <div className = 'mb-1'>
          <div className = 'fw-bold'>Charles BOUVEYRON</div>
          <div>{ t("Pdf/PdfApp:full-stack-engineer.side-panel.references.charles-bouveyron.description") }</div>
          <div style = {{ fontSize: "0.8rem" }}>charles.bouveyron@inria.fr</div>
        </div>
      </div>
    </div>

    <div style = {{ padding: `${PADDING / 2 - HEADER_BORDER_WIDTH / 2}px`, position: "relative", zIndex: 2 }}>
      <div
        className = 'border-dark my-3 py-4 pe-4 d-flex align-items-center'
        style = {{
          left: `${PADDING / 2 - HEADER_BORDER_WIDTH / 2}px`,
          paddingLeft: `${PADDING / 2 - HEADER_BORDER_WIDTH / 2}px`,
          border: `${HEADER_BORDER_WIDTH}px solid black`
        }}
      >
        <img
          className = "rounded-circle shadow d-inline-block"
          src = { selfPicture }
          style = {{ margin: `0 ${STRIPE_WIDTH / 8}px 0 ${STRIPE_WIDTH / 8}px` }}
          width = { STRIPE_WIDTH * 0.75 }
        />
        <div style = {{ paddingLeft: `${PADDING / 2 - HEADER_BORDER_WIDTH / 2}px` }}>
          <h1 className = 'display-5'>Stéphane Petiot</h1>
          <h4 className = 'text-muted'>{ t("Pdf/PdfApp:full-stack-engineer.title") }</h4>
        </div>
      </div>
      <div style = {{ marginLeft: `${PADDING + STRIPE_WIDTH}px` }} >
        <div className = 'mt-5'>
          <h3>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.title") }</h3>
          <div className = 'row'>
            <div className = "col-4 text-end border border-dark border-1 border-top-0 border-start-0 border-bottom-0">
              <div>{ t("glossary:March") } 2023<i className = "bi bi-caret-right-fill mx-1" />{ t("glossary:Present") }</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.first-item.location") }</small>
            </div>
            <div className = "col-8 pb-1">
              <div><b>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.first-item.title") }</b> | { t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.first-item.company") }</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.first-item.description") }</small>
              <small className = 'd-flex flex-wrap'>
                {
                    Array.from(["NLP", "Clustering", "Computer Vision"]).map((item, i) => {
                        return <small key = { i } className = "border border-dark border-1 rounded-pill px-2 my-1 me-2 text-nowrap">{ item }</small>; 
                    })
                }
              </small>
            </div>
          </div>
          <div className = 'row'>
            <div className = "col-4 text-end border border-dark border-1 border-top-0 border-start-0 border-bottom-0">
              <div>{ t("glossary:March") } 2021<i className = "bi bi-caret-right-fill mx-1" />{ t("glossary:February") } 2023</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.second-item.location") }</small>
            </div>
            <div className = "col-8 pb-1">
              <div><b>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.second-item.title") }</b> | { t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.second-item.company") }</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.work-experience.second-item.description") }</small>
              <small className = 'd-flex flex-wrap'>
                {
                    Array.from(["NLP", "Clustering", "Topic Modelling"]).map((item, i) => {
                        return <small key = { i } className = "border border-dark border-1 rounded-pill px-2 my-1 me-2 text-nowrap">{ item }</small>; 
                    })
                }
              </small>
            </div>
          </div>
        </div>
        <div className = 'mt-5'>
          <h3>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.title") }</h3>
          <div className = 'row'>
            <div className = "col-4 text-end border border-dark border-1 border-top-0 border-start-0 border-bottom-0">
              <div>2016<i className = "bi bi-caret-right-fill mx-1" />2019</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.first-item.location") }</small>
            </div>
            <div className = "col-8 pb-1">
              <div><b>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.first-item.title") }</b> | { t("Pdf/PdfApp:full-stack-engineer.main-panel.education.first-item.school") }</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.first-item.description") }</small>
            </div>
          </div>

          <div className = 'row'>
            <div className = "col-4 text-end border border-dark border-1 border-top-0 border-start-0 border-bottom-0">
              <div>2014<i className = "bi bi-caret-right-fill mx-1" />2016</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.second-item.location") }</small>
            </div>
            <div className = "col-8 pb-1">
              <div><b>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.second-item.title") }</b> | { t("Pdf/PdfApp:full-stack-engineer.main-panel.education.second-item.school") }</div>
              <small className = 'text-muted d-block'>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.education.second-item.description") }</small>
            </div>
          </div>
        </div>
        <div className = 'mt-5'>
          <h3>{ t("Pdf/PdfApp:full-stack-engineer.main-panel.skills.title") }</h3>
          <div className = 'row text-center'>
            <div className = 'col-4 d-flex flex-column justify-content-center'>
              <div className = 'fw-bold'>{ t("glossary:Frontend") }</div>
              {
                FRONTEND_SKILLS.map((skill, i) => (
                  <div key = { i } className = 'row'>
                      <div className = "col-6 text-nowrap"><small>{ skill.name }</small></div>
                      <div className = "col-6 d-flex align-items-center">
                        <div className = "w-100 border border-dark border-1 p-0" style = {{ height: "8px" }}>
                          <div className = "bg-dark h-100" style = {{ width: `${ skill.level }%` }} />
                        </div>
                      </div>
                  </div>
                ))
              }
            </div>
            <div className = 'col-4 d-flex flex-column justify-content-center'>
              <div className = 'fw-bold'>{ t("glossary:Backend") }</div>
              {
                BACKEND_SKILLS.map((skill, i) => (
                  <div key = { i } className = 'row'>
                      <div className = "col-6 text-nowrap"><small>{ skill.name }</small></div>
                      <div className = "col-6 d-flex align-items-center">
                        <div className = "w-100 border border-dark border-1 p-0" style = {{ height: "8px" }}>
                          <div className = "bg-dark h-100" style = {{ width: `${ skill.level }%` }} />
                        </div>
                      </div>
                  </div>
                ))
              }
            </div>
            <div className = 'col-4 d-flex flex-column justify-content-between'>
              <div>
                <div className = 'fw-bold'>{ t("glossary:Miscellaneous") }</div>
                {
                  MISCELLANEOUS_SKILLS.map((skill, i) => (
                    <div key = { i } className = 'row'>
                        <div className = "col-6 text-nowrap"><small>{ skill.name }</small></div>
                        <div className = "col-6 d-flex align-items-center">
                          <div className = "w-100 border border-dark border-1 p-0" style = {{ height: "8px" }}>
                            <div className = "bg-dark h-100" style = {{ width: `${ skill.level }%` }} />
                          </div>
                        </div>
                    </div>
                  ))
                }
              </div>
              <div>
                <div className = 'fw-bold'>{ t("glossary:OS") }</div>
                {
                  ENVIRONMENT_SKILLS.map((skill, i) => (
                    <div key = { i } className = 'row'>
                        <div className = "col-6 text-nowrap"><small>{ skill.name }</small></div>
                        <div className = "col-6 d-flex align-items-center">
                          <div className = "w-100 border border-dark border-1 p-0" style = {{ height: "8px" }}>
                            <div className = "bg-dark h-100" style = {{ width: `${ skill.level }%` }} />
                          </div>
                        </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default PdfApp;