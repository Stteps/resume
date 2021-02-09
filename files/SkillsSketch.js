const SKILLS_ICON_PATH = './files/pictures/skills_white.png';

let greenDotHtml = "<span style = ' color : green; '>&#9679;</span>";
let orangeDotHtml = "<span style = ' color : orange; '>&#9679;</span>";
let orangeredDotHtml = "<span style = ' color : orangered; '>&#9679;</span>";

let skillsSketch = 
    "<div class = 'sectionHeader'>"
        + "<img class = 'sectionIcon' src = " + SKILLS_ICON_PATH + ">&nbsp;"
        + "<span id = 'skillsSectionLabel'>COMPETENCES CLES</span>&emsp;&emsp;"
        + "<span class = 'levelsLegend'>"
            + greenDotHtml + " <span id = 'masteryLabel'>Maîtrise</span>&nbsp;"
            + orangeDotHtml + " <span id = 'goodKnowledgeLabel'>Bonne connaissance</span>&nbsp;"
            + orangeredDotHtml + " <span id = 'basicKnowledgeLabel'>Connaissances basiques</span>"
        + "</span>"
    + "</div>"
    + `<div class = 'sectionContent'>
        <div class = 'skills' style = ' grid-column: 1; grid-row-start: 1; grid-row-end: 4; '>
            <span class = 'skillsTopic' id = 'skillsTopic1'><u>Langages/Frameworks</u></span>
            <dl class = 'skillsDescription' style = ' display : grid; grid-row-gap : 0.5em; '>`
                + "<span style = 'grid-column : 1; grid-row : 1'>"
                    + "<dt class = 'skillName'>Python  " + orangeDotHtml + " </dt>"
                        + "<dd>scikit-learn  " + orangeDotHtml + " </dd>"
                        + "<dd>TensorFlow  " + orangeredDotHtml + " </dd>"
                        + "<dd>PyTorch  " + orangeredDotHtml + " </dd>"
                + "</span>"
                + "<span style = 'grid-column : 1; grid-row : 2'>"
                    + "<dt class = 'skillName'>C++ " + orangeDotHtml + " </dt>"
                        + "<dd>Qt  " + orangeDotHtml + " </dd>"
                + "</span>"
                + "<span style = 'grid-column : 1; grid-row : 3'>"
                    + "<dt class = 'skillName'>Scala  " + orangeredDotHtml + " </dt>"
                        + "<dd>Hadoop/Spark  " + orangeredDotHtml + " </dd>"
                + "</span>"
                + "<span style = 'grid-column : 1; grid-row : 4'>"
                    + "<dt class = 'skillName'>SQL  " + orangeredDotHtml + " </dt>"
                + "</span>"
                + "<span style = 'grid-column : 1; grid-row : 5'>"
                    + "<dt class = 'skillName'>HTML/CSS  " + greenDotHtml + " </dt>"
                + "</span>"
                + "<span style = 'grid-column : 2; grid-row : 1'>"
                    + "<dt class = 'skillName'>JavaScript / TypeScript  " + greenDotHtml + " </dt>"
                        + "<dd>Angular  " + orangeDotHtml + " </dd>"
                        + "<dd>Karma/Jasmine  " + orangeredDotHtml + " </dd>"
                        + "<dd>Protractor  " + orangeredDotHtml + " </dd>"
                        + "<dd>jQuery  " + greenDotHtml + " </dd>"
                        + "<dd>three.js  " + greenDotHtml + " </dd>"
                + "</span>"
                + "<span style = 'grid-column : 2; grid-row : 2'>"
                    + "<dt class = 'skillName'>MatLab  " + greenDotHtml + " </dt>"
                        + "<dd>MatLab for ML  " + orangeDotHtml + " </dd>"
                + "</span>"
                + "<span style = 'grid-column : 2; grid-row : 3'>"
                    + "<dt class = 'skillName'>C#  " + orangeredDotHtml + " </dt>"
                        + "<dd>.NET  " + orangeredDotHtml + " </dd>"
                + "</span>"
                + "<span style = 'grid-column : 2; grid-row : 4'>"
                    + "<dt class = 'skillName'>Java  " + orangeDotHtml + " </dt>"
                + "</span>"
            + "</dl>"
        + "</div>"
        + `<div class = 'skills' style = ' grid-column: 2; grid-row: 3; '>
            <span class = 'skillsTopic'><u>OS</u></span>
            <dl class = 'skillsDescription'>`
                + "<dt>Windows  " + orangeDotHtml + " </dt>"
                + "<dt>Linux  " + orangeDotHtml + " </dt>"
            + "</dl>"
        + "</div>"
        + `<div class = 'skills' style = ' grid-column: 2; grid-row-start: 1; grid-row-end: 3; '>
            <span class = 'skillsTopic' id = 'skillsTopic3'><u>Outils</u></span>
            <dl class = 'skillsDescription'>`
                + "<dt>MatLab  " + greenDotHtml + " </dt>"
                + "<dt>Visual Studio Code  " + greenDotHtml + " </dt>"
                + "<dt>Qt Creator  " + orangeDotHtml + " </dt>"
                + "<dt>IntelliJ  " + orangeredDotHtml + " </dt>"
                + "<dt>Eclipse  " + orangeDotHtml + " </dt>"
                + "<dt>Git  " + orangeDotHtml + " </dt>"
                    + "<dd>GitHub  " + orangeDotHtml + " </dd>"
                    + "<dd>BitBucket  " + orangeDotHtml + " </dd>"
                + "<dt>Jira  " + orangeDotHtml + " </dd>"
            + "</dl>"
        + "</div>"
        + `<div class = 'skills' style = ' grid-column: 3; grid-row: 2; '>
            <span class = 'skillsTopic' id = 'skillsTopic4'><u>Methodes</u></span>
            <dl class = 'skillsDescription'>`
                + "<dt>Scrum  " + orangeDotHtml + " </dt>"
            + "</dl>"
        + "</div>"
        + `<div class = 'skills' style = ' grid-column: 3; grid-row: 1; '>
            <span class = 'skillsTopic' id = 'skillsTopic5'><u>Connaissances du secteur</u></span>
            <dl class = 'skillsDescription' id = 'skillsDescription5'>`
                + "<dt>Défense sous-marine  " + orangeDotHtml + " </dt>"
                + "<dt>IT  " + orangeDotHtml + " </dt>"
                + "<dt>Semi-conducteur  " + orangeredDotHtml + " </dt>"
            + "</dl>"
        + "</div>"
        + `<div class = 'skills' style = ' grid-column: 3; grid-row: 3; '>
            <span class = 'skillsTopic' id = 'skillsTopic6'><u>Autres compétences</u></span>
            <dl class = 'skillsDescription' id = 'skillsDescription6'>`
                + "<dt>Communication orale et écrite français / anglais</dt>"
                + "<dt>Travail en équipe et agile</dt>"
                + "<dt>Autonomie</dt>"
            + "</dl>"
        + "</div>"
    + "</div>"