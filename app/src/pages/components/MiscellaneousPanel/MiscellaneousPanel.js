import React from "react";


const MiscellaneousPanel = () => {
    return <>
        <div className = 'sectionHeader'>
            <img className = 'sectionIcon' src = "" />&nbsp;
            <span id = 'miscSectionLabel'>DIVERS</span>
        </div>
        <div className = 'sectionContent'>
            <div className = 'misc' style = {{ gridColumn: 1, gridRow: 1 }}>
                <span className = 'miscTopic' id = 'miscTopic1'><u>Certifications</u></span>
                <dl className = 'miscDescription'>
                    <dt><span className = 'miscName'>TOEFL ITP</span> : 607/677 (2018)</dt>
                    <dt><span className = 'miscName'>TOEIC Listening & Reading</span> : 900/990 (2016)</dt>
                    <dt><span className = 'miscName' id = 'miscCertificationName3'>Certification Voltaire</span> : 816/1000 (2016)</dt>
                </dl>
            </div>
            <div className = 'misc' style = {{ gridColumn: 2, gridRow: 1 }}>
                <span className = 'miscTopic' id = 'miscTopic2'><u>Langues</u></span>
                <dl className = 'miscDescription'>
                    <dt>
                        <img className = 'languageFlag' src = './files/pictures/france.png' />
                        <span className = 'miscName' id = 'miscLanguageName1'>&nbsp;Français</span> : <span id = 'nativeLanguageLabel'>Langue Maternelle</span>
                    </dt>
                    <dt>
                        <img className = 'languageFlag' src = './files/pictures/uk.png' />
                        <span className = 'miscName' id = 'miscLanguageName2'>&nbsp;Anglais</span> : <span id = 'fluentLabel'>Courant</span> (C1)
                    </dt>
                    <dt>
                        <img className = 'languageFlag' src = './files/pictures/spain.png' />
                        <span className = 'miscName' id = 'miscLanguageName3'>&nbsp;Espagnol</span> : <span id = 'academicLabel'>Scolaire</span>
                    </dt>
                </dl>
            </div>
            <div className = 'misc' style = {{ gridColumnStart: 1, gridColumnEnd: 3, gridRow: 2 }}>
                <span className = 'miscTopic' id = 'miscTopic3'><u>Centres d&apos;intérêts</u></span>
                <dl className = 'miscDescription' style = {{ display: 'grid' }}>
                    <span style = {{ gridColumn: 1, gridRow: 1 }}>
                        <dt className = 'miscName' id = 'miscInterestsName1'>Sport</dt>
                            <dd id = 'runningLabel'>Course à pied</dd>
                            <dd id = 'tennisLabel'>Tennis</dd>
                    </span>
                    <span style = {{ gridColumnStart: 1, gridColumnEnd: 3, gridRow: 2 }}>
                        <dt className = 'miscName' id = 'miscInterestsName2'>Voyages</dt>
                        <dd id = 'travelsLabel' style = {{ lineHeight: 1 }}>Canada, Etats-Unis, Italie, Belgique, Pays-Bas, Allemagne, Slovénie, Croatie, Monténégro, Albanie, Grèce, Bulgarie, Roumanie, Serbie, Hongrie, Autriche, Slovaquie, Pologne</dd>
                    </span>
                    <span style = {{ gridColumn: 2, gridRow: 1 }}>
                        <dt className = 'miscName' id = 'miscInterestsName3'>Musique</dt>
                        <dd id = 'guitarLabel'>Pratique de la guitare depuis 2009</dd>
                    </span>
                </dl>
            </div>
        </div>
    </>;
};

export default MiscellaneousPanel;