const FRENCH = 0, ENGLISH = 1;

let frenchTextContent = [
    "LANGUE",
    "Français",
    "Anglais",
    "Ingénieur Data & Machine Learning",
    "Mon profil est axé autour des Data Sciences, avec une spécialisation en Machine Learning.",
    "Je possède également des compétences intermédiaires en développement logiciel et en Web.",
    "EXPERIENCE PROFESSIONNELLE",
    "Février",
    "Juin",
    "Ingénieur Big Data",
    "Contribution au développement et à l’industrialisation d’un outil d’aide à la décision pour les analystes business des airlines.",
    "Tests avec",
    "Environnement Agile",
    "Septembre",
    "Analyste Soutien Logistique Intégré",
    "Développement d’une application web de formation (HTML, CSS, JavaScript avec technologie WebGL)",
    "Développement d’une solution de traitement pour la maintenance prédictive (Prototypage sous MatLab, programmation de RNN, SVM, etc.)",
    "Avril",
    "Stagiaire Software",
    "Développement d'un outil de communication I²C avec STM32 interface PC",
    "FORMATION",
    "Ingénieur Supélec",
    "Majeure en Systèmes Interactifs & Robotique",
    "Formation par apprentissage",
    "Diplôme Universitaire de Technologie",
    "Génie Electrique & Informatique Industrielle (GEII)",
    "Major de promotion",
    "Baccalauréat Général",
    "Filière Scientifique (S)",
    "Option Informatique & Science du Numérique (ISN)",
    "Mention Assez Bien",
    "COMPETENCES CLES",
    "Maîtrise",
    "Bonne connaissance",
    "Connaissances basiques",
    "Langages/Frameworks",
    "Outils",
    "Methodes",
    "Connaissances du secteur",
    "Défense sous-marine",
    "Semi-conducteur",
    "Autres compétences",
    "Communication orale et écrite français / anglais",
    "Travail en équipe et agile",
    "Autonomie",
    "DIVERS",
    "Certifications",
    "Certification Voltaire",
    "Langues",
    "Français",
    "Langue maternelle",
    "Anglais",
    "Courant",
    "Espagnol",
    "Scolaire",
    "Centres d'intérêts",
    "Sport",
    "Course à pied",
    "Tennis",
    "Voyages",
    "Canada, Etats-Unis, Italie, Belgique, Pays-Bas, Allemagne, Slovénie, Croatie, Monténégro, Albanie, Grèce, Bulgarie, Roumanie, Serbie, Hongrie, Autriche, Slovaquie, Pologne",
    "Musique",
    "Pratique de la guitare depuis 2009",
    "EXPERIENCE",
    "COMPETENCES"
];
let englishTextContent = [
    "LANGUAGE",
    "French",
    "English",
    "Data & Machine Learning Engineer",
    "I am qualified in Data Sciences, with a strong interest in Machine Learning",
    "I am also proficient in Software applications and Web development",
    "WORK EXPERIENCE",
    "February",
    "June",
    "Data Engineer",
    "Development and industrialization of a decision tool for arlines business analysts.",
    "Tests with",
    "Agile Environment",
    "September",
    "Integrated Logistic Support Analyst",
    "Development of a training web application (HTML, CSS, JavaScript with WebGL Technology)",
    "Development of a predictive maintenance software solution (Prototyping with MatLab, programming of RNN networks, SVM, etc.)",
    "April",
    "Software Intern",
    "Development of an I²C communication interface with STM32 and PC Interface",
    "EDUCATIONAL BACKGROUND",
    "Supélec Engineer",
    "Major in Interactive Systems & Robotics",
    "Apprenticeship",
    "2-year University Diploma",
    "Electrical Engineering & Industrial Computing",
    "Valedictorian",
    "Baccalauréat Général",
    "Sciences",
    "Major in Computer Sciences",
    "With distinction",
    "SKILLS",
    "Mastery",
    "Good knowledge",
    "Basic knowledge",
    "Languages/Frameworks",
    "Tools",
    "Methods",
    "Field knowledge",
    "Underwater Defense",
    "Semiconductor",
    "Other skills",
    "Writen and spoken communication french / english",
    "Team working and Agile",
    "Autonomy",
    "MISCELLANEOUS",
    "Certifications",
    "Voltaire Certification",
    "Languages",
    "French",
    "Native language",
    "English",
    "Fluent",
    "Spanish",
    "School knowledge",
    "Interests",
    "Sport",
    "Running",
    "Tennis",
    "Travels",
    "Canada, USA, Italy, Belgium, Netherlands, Germany, Slovenia, Croatia, Montenegro, Albania, Greece, Bulgaria, Romania, Serbia, Hungary, Austria, Slovakia, Poland",
    "Music",
    "Guitar practice since 2009",
    "WORK EXPERIENCE",
    "SKILLS"
];

function changeLanguage( language ) {
    let textContent;
    switch( language ) {
        case FRENCH :
            textContent = frenchTextContent;
            break;
        case ENGLISH :
            textContent = englishTextContent;
            break;
        default :
            textContent = frenchTextContent;
            break;
    }

    changeInfoLanguage( textContent );
    changeWorkLanguage( textContent );
    changeDegreeLanguage( textContent );
    changeSkillsLanguage( textContent );
    changeMiscLanguage( textContent );
}

function changeInfoLanguage( textContent ) {
    document.getElementById('profileTitle').textContent = textContent[3];
    document.getElementById('profileDescription').innerHTML = textContent[4] + "</br>" + textContent[5];
}

function changeWorkLanguage( textContent ) {
    document.getElementById('workSectionLabel').textContent = textContent[6];
    document.getElementById('dateWork1').innerHTML = textContent[7] + " 2020 -</br>" + textContent[8] + " 2020";
    document.getElementById('positionName1').textContent = textContent[9] + " | ";
    document.getElementById('jobDescription1').innerHTML = 
        "</br>" + textContent[10] + "</br>"
        + "<span style = 'font-weight : bold'>Front-end :</span> Angular 9, " + textContent[11] + " Karma (Jasmine), Protractor</br>"
        + "<span style = 'font-weight : bold'>Back-end :</span> C++</br>"
        + "<span style = 'font-weight : bold'>Big Data :</span> Hadoop/Spark, Scala</br>"
        + textContent[12];
    document.getElementById('dateWork2').innerHTML = textContent[13] + " 2016 -</br>" + textContent[13] + " 2019";
    document.getElementById('positionName2').textContent = textContent[14] + " | ";
    document.getElementById('jobDescription2').innerHTML = textContent[15] + "</br>" + textContent[16];
    document.getElementById('dateWork3').innerHTML = textContent[17] + " 2014 -</br>" + textContent[8] + " 2014";
    document.getElementById('positionName3').textContent = textContent[18] + " | "
    document.getElementById('jobDescription3').innerHTML = textContent[19] + "</br><span style = ' font-weight : bold; '>Technologies</span> : C++, Qt, STM32, mbed"
}

function changeDegreeLanguage( textContent ) {
    document.getElementById('degreeSectionLabel').textContent = textContent[20];
    document.getElementById('degreeName1').textContent = textContent[21] + " | ";
    document.getElementById('degreeDescription1').innerHTML =
        "</br>" + textContent[22] + "</br>"
        + textContent[23] + " (Thales DMS - Sophia Antipolis)";
    document.getElementById('degreeName2').textContent = textContent[24] + " | ";
    document.getElementById('degreeDescription2').innerHTML =
        "</br>" + textContent[25] + "</br>"
        + textContent[26];
    document.getElementById('degreeName3').textContent = textContent[27] + " | ";
    document.getElementById('degreeDescription3').innerHTML =
        "</br>" + textContent[28] + "</br>"
        + textContent[29] + "</br>"
        + textContent[30];
}

function changeSkillsLanguage( textContent ) {
    document.getElementById('skillsSectionLabel').textContent = textContent[31];
    document.getElementById('masteryLabel').textContent = textContent[32];
    document.getElementById('goodKnowledgeLabel').textContent = textContent[33];
    document.getElementById('basicKnowledgeLabel').textContent = textContent[34];
    document.getElementById('skillsTopic1').innerHTML = "<u>" + textContent[35] + "</u>";
    document.getElementById('skillsTopic3').innerHTML = "<u>" + textContent[36] + "</u>";
    document.getElementById('skillsTopic4').innerHTML = "<u>" + textContent[37] + "</u>";
    document.getElementById('skillsTopic5').innerHTML = "<u>" + textContent[38] + "</u>";
    document.getElementById('skillsDescription5').innerHTML =
        "<dt>" + textContent[39] + " <span style = ' color : orange; '>&#9679;</span></dt>"
        + "<dt>IT " + " <span style = ' color : orange; '>&#9679;</span></dt>"
        + "<dt>" + textContent[40] + " <span style = ' color : orangered; '>&#9679;</span></dt>"
    document.getElementById('skillsTopic6').innerHTML = "<u>" + textContent[41] + "</u>";
    document.getElementById('skillsDescription6').innerHTML =
        "<dt>" + textContent[42] + "</dt>"
        + "<dt>" + textContent[43] + "</dt>"
        + "<dt>" + textContent[44] + "</dt>";
}

function changeMiscLanguage( textContent ) {
    document.getElementById('miscSectionLabel').textContent = textContent[45];
    document.getElementById('miscTopic1').innerHTML = "<u>" + textContent[46] + "</u>";
    document.getElementById('miscCertificationName3').textContent = textContent[47];
    document.getElementById('miscTopic2').innerHTML = "<u>" + textContent[48] + "</u>";
    document.getElementById('miscLanguageName1').innerHTML = "&nbsp;" + textContent[49];
    document.getElementById('nativeLanguageLabel').textContent = textContent[50];
    document.getElementById('miscLanguageName2').innerHTML = "&nbsp;" + textContent[51];
    document.getElementById('fluentLabel').textContent = textContent[52];
    document.getElementById('miscLanguageName3').innerHTML = "&nbsp;" + textContent[53];
    document.getElementById('academicLabel').textContent = textContent[54];
    document.getElementById('miscTopic3').innerHTML = "<u>" + textContent[55] + "</u>";
    document.getElementById('miscInterestsName1').textContent = textContent[56];
    document.getElementById('runningLabel').textContent = textContent[57];
    document.getElementById('tennisLabel').textContent = textContent[58];
    document.getElementById('miscInterestsName2').textContent = textContent[59];
    document.getElementById('travelsLabel').textContent = textContent[60];
    document.getElementById('miscInterestsName3').textContent = textContent[61];
    document.getElementById('guitarLabel').textContent = textContent[62];
}