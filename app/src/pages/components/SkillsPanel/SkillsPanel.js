import React from "react";


const SkillsPanel = () => {
    return <>
        <div className = "display-3 border border-top-0 border-start-0 border-end-0 border-bottom-5 border-white"><i className = "bi bi-tools"></i>&nbsp;Compétences</div>
        <div className = 'sectionHeader'>
            <img className = 'sectionIcon' src = "" />&nbsp;
            <span id = 'skillsSectionLabel'>COMPETENCES CLES</span>&emsp;&emsp;
            <span className = 'levelsLegend'>
                <span style={{ color: 'green' }}>{'\u25CF'}</span>  <span id = 'masteryLabel'>Maîtrise</span>&nbsp;
                <span style={{ color: 'orange' }}>{'\u25CF'}</span>  <span id = 'goodKnowledgeLabel'>Bonne connaissance</span>&nbsp;
                <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  <span id = 'basicKnowledgeLabel'>Connaissances basiques</span>
            </span>
        </div>
        <div className = 'sectionContent'>
            <div className = 'skills' style = {{ gridColumn: 1, gridRowStart: 1, gridRowEnd: 4 }}>
                <span className = 'skillsTopic' id = 'skillsTopic1'><u>Langages/Frameworks</u></span>
                <dl className = 'skillsDescription' style = {{ display: "grid", gridRowGap: "0.5em" }}>
                    <span style = {{ gridColumn: 1, gridRow: 1 }}>
                        <dt className = 'skillName'>Python   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                            <dd>scikit-learn   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dd>
                            <dd>TensorFlow   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dd>
                            <dd>PyTorch   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dd>
                    </span>
                    <span style = {{ gridColumn: 1, gridRow: 2 }}>
                        <dt className = 'skillName'>C+ <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                            <dd>Qt   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dd>
                    </span>
                    <span style = {{ gridColumn: 1, gridRow: 3 }}>
                        <dt className = 'skillName'>Scala   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dt>
                            <dd>Hadoop/Spark   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dd>
                    </span>
                    <span style = {{ gridColumn: 1, gridRow: 4 }}>
                        <dt className = 'skillName'>SQL   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dt>
                    </span>
                    <span style = {{ gridColumn: 1, gridRow: 5 }}>
                        <dt className = 'skillName'>HTML/CSS   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dt>
                    </span>
                    <span style = {{ gridColumn: 2, gridRow: 1 }}>
                        <dt className = 'skillName'>JavaScript / TypeScript   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dt>
                            <dd>Angular   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dd>
                            <dd>Karma/Jasmine   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dd>
                            <dd>Protractor   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dd>
                            <dd>jQuery   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dd>
                            <dd>three.js   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dd>
                    </span>
                    <span style = {{ gridColumn: 2, gridRow: 2 }}>
                        <dt className = 'skillName'>MatLab   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dt>
                            <dd>MatLab for ML   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dd>
                    </span>
                    <span style = {{ gridColumn: 2, gridRow: 3 }}>
                        <dt className = 'skillName'>C#   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dt>
                            <dd>.NET   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dd>
                    </span>
                    <span style = {{ gridColumn: 2, gridRow: 4 }}>
                        <dt className = 'skillName'>Java   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                    </span>
                </dl>
            </div>
            <div className = 'skills' style = {{ gridColumn: 2, gridRow: 3 }}>
                <span className = 'skillsTopic'><u>OS</u></span>
                <dl className = 'skillsDescription'>
                    <dt>Windows   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                    <dt>Linux   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                </dl>
            </div>
            <div className = 'skills' style = {{ gridColumn: 2, gridRowStart: 1, gridRowEnd: 3 }}>
                <span className = 'skillsTopic' id = 'skillsTopic3'><u>Outils</u></span>
                <dl className = 'skillsDescription'>
                    <dt>MatLab   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dt>
                    <dt>Visual Studio Code   <span style={{ color: 'green' }}>{'\u25CF'}</span>  </dt>
                    <dt>Qt Creator   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                    <dt>IntelliJ   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dt>
                    <dt>Eclipse   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                    <dt>Git   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                        <dd>GitHub   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dd>
                        <dd>BitBucket   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dd>
                    <dt>Jira   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                </dl>
            </div>
            <div className = 'skills' style = {{ gridColumn: 3, gridRow: 2 }}>
                <span className = 'skillsTopic' id = 'skillsTopic4'><u>Methodes</u></span>
                <dl className = 'skillsDescription'>
                    <dt>Scrum   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                </dl>
            </div>
            <div className = 'skills' style = {{ gridColumn: 3, gridRow: 1 }}>
                <span className = 'skillsTopic' id = 'skillsTopic5'><u>Connaissances du secteur</u></span>
                <dl className = 'skillsDescription' id = 'skillsDescription5'>
                    <dt>Défense sous-marine   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                    <dt>IT   <span style={{ color: 'orange' }}>{'\u25CF'}</span>  </dt>
                    <dt>Semi-conducteur   <span style={{ color: 'orangered' }}>{'\u25CF'}</span>  </dt>
                </dl>
            </div>
            <div className = 'skills' style = {{ gridColumn: 3, gridRow: 3 }}>
                <span className = 'skillsTopic' id = 'skillsTopic6'><u>Autres compétences</u></span>
                <dl className = 'skillsDescription' id = 'skillsDescription6'>
                    <dt>Communication orale et écrite français / anglais</dt>
                    <dt>Travail en équipe et agile</dt>
                    <dt>Autonomie</dt>
                </dl>
            </div>
        </div>
    </>;
};

export default SkillsPanel;