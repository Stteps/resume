import "jquery/dist/jquery";
import '@popperjs/core/dist/esm/popper';
import "bootstrap/dist/js/bootstrap.bundle";

import React from 'react';
import { createRoot } from 'react-dom/client';

import IndexApp from './containers/IndexApp';

import "bootstrap-icons/font/bootstrap-icons.min.css";

import "~/scss/main.scss";
import "~/scss/pages/index.scss";


createRoot(document.getElementById('index-app')).render(<IndexApp />);


// import { OrbitControls } from './files/Scripts/OrbitControls.js';

// import { EffectComposer } from './files/Scripts/EffectComposer.js';
// import { UnrealBloomPass } from './files/Scripts/UnrealBloomPass.js';
// import { RenderPass } from './files/Scripts/RenderPass.js';
// import { ShaderPass } from './files/Scripts/ShaderPass.js';
// import { ClearPass } from './files/Scripts/ClearPass.js';
// import { CopyShader } from './files/Scripts/CopyShader.js';
// import { CSS3DRenderer, CSS3DObject } from './files/Scripts/CSS3DRenderer.js';

// var container;
// var camera, scene, renderer, composer, rayCaster, mouse;
// var cssRenderer, cssScene;

// var rotatingGroup;

// var particlesData = [];
// var positions, colors;
// var particles;
// var pointCloud;
// var particlePositions;
// var linesMesh;
// var maxParticleCount = 1000;
// var particleCount = 750;
// var r = 2500;
// var rHalf = r / 2;

// var sphereMaterial, sphereSelectedMaterial;
// var sphereWork, sphereDegree, sphereSkills, sphereMisc;
// var sphereWorkContainer, sphereDegreeContainer, sphereSkillsContainer, sphereMiscContainer;

// var linesSection;
// var sectionPanel;

// var effectController = {
//   showDots: true,
//   showLines: true,
//   minDistance: 150,
//   limitConnections: true,
//   maxConnections: 20,
//   particleCount: 500
// };

// const SPHERE_Y_LEVELS = -500, SPHERE_ORBITING_RADIUS = 500;

// const WORK_SECTION = 0, DEGREE_SECTION = 1, SKILLS_SECTION = 2, MISC_SECTION = 3;		

// var workSelected, degreeSelected, skillsSelected, miscSelected;
// var intersectWork, intersectDegree, intersectSkills, intersectMisc;

// var infoDomObject, emailFormDomObject, workDomObject, degreeDomObject, skillsDomObject, miscDomObject;
// var workLabelDomObject, degreeLabelDomObject, skillsLabelDomObject, miscLabelDomObject;

// var frenchButton, englishButton;


// window.onload = init();
// animate();

// function init() {
//   //Récupération du conteneur
//   container = document.getElementById( 'container' );

//   //SCENE INITIALIZATION
//   //Scene
//   scene = new THREE.Scene();
//   cssScene = new THREE.Scene();
//   //Load background texture
//   const loader = new THREE.TextureLoader();
//   loader.load('./files/pictures/background.jpg' , function(texture)
//   {
//     scene.background = texture;
//   });

//   //Camera
//   camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
//   camera.position.z = 1850;
  
//   //Renderer
//   renderer = new THREE.WebGLRenderer( { antialias: true, alpha : true } );
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
  
//   container.appendChild( renderer.domElement );
  
//   cssRenderer = new CSS3DRenderer();
//   cssRenderer.setSize( window.innerWidth, window.innerHeight );
//   cssRenderer.domElement.style.position = 'absolute';
//   cssRenderer.domElement.style.top = 0;
  
//   container.appendChild( cssRenderer.domElement );

//   window.addEventListener( 'resize', onWindowResize, false );

//   //Mouse Manager
//   rayCaster = new THREE.Raycaster();
//   mouse = new THREE.Vector2();
  
//   //Controles
//   var controls = new OrbitControls( camera, container );
//   controls.minDistance = 1000;
//   controls.maxDistance = 3000;

//   //Lumières
//   var light = new THREE.AmbientLight( 0xffffff , 0.6 );
//   scene.add( light );

//   //3D OBJECTS INITIALIZATION
//   //Groupe objets orbitants
//   rotatingGroup = new THREE.Group();
//   scene.add( rotatingGroup );

//   //Nuage de points et segments
//   var segments = maxParticleCount * maxParticleCount;	//Nombre de connexions possibles
//   positions = new Float32Array( segments * 3 );	//Coordonnées des points
//   colors = new Float32Array( segments * 3 );	//Couleurs des points
  
//   particlePositions = new Float32Array( maxParticleCount * 3 );
//   particles = new THREE.BufferGeometry();

//   var pMaterial = new THREE.PointsMaterial( {
//     color: 0xFFFFFF,
//     size: 1.1,
//     blending: THREE.AdditiveBlending,
//     transparent: true,
//     sizeAttenuation: false
//   } );

//   for ( var i = 0; i < maxParticleCount; i ++ ) {
//     var x = Math.random() * r - r / 2;
//     var y = Math.random() * r - r / 2;
//     var z = Math.random() * r - r / 2;

//     particlePositions[ i * 3 ] = x;
//     particlePositions[ i * 3 + 1 ] = y;
//     particlePositions[ i * 3 + 2 ] = z;

//     // add it to the geometry
//     particlesData.push( {
//       velocity: new THREE.Vector3( - 1 + Math.random() * 2, - 1 + Math.random() * 2, - 1 + Math.random() * 2 ),
//       numConnections: 0
//     } );
//   }

//   particles.setDrawRange( 0, particleCount );
//   particles.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setUsage( THREE.DynamicDrawUsage ) );

//   // create the particle system
//   pointCloud = new THREE.Points( particles, pMaterial );
//   rotatingGroup.add( pointCloud );

//   var geometry = new THREE.BufferGeometry();

//   geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
//   geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );

//   geometry.computeBoundingSphere();

//   geometry.setDrawRange( 0, 0 );

//   var material = new THREE.LineBasicMaterial( {
//     vertexColors: true,
//     blending: THREE.AdditiveBlending,
//     transparent: true
//   } );

//   linesMesh = new THREE.LineSegments( geometry, material );
//   rotatingGroup.add( linesMesh );

//   //Spheres

//   geometry = new THREE.SphereGeometry( 50, 50, 50 );

//   sphereMaterial = new THREE.MeshBasicMaterial({color : 0xffffff});
//   sphereSelectedMaterial = new THREE.MeshBasicMaterial({color : 0xffffff});

//   sphereWork = new THREE.Mesh( geometry, sphereMaterial );
//   sphereDegree = new THREE.Mesh( geometry, sphereMaterial );
//   sphereSkills = new THREE.Mesh( geometry, sphereMaterial );
//   sphereMisc = new THREE.Mesh( geometry, sphereMaterial );

//   sphereWork.position.set( -SPHERE_ORBITING_RADIUS, SPHERE_Y_LEVELS, 0 );
//   sphereDegree.position.set( 0, SPHERE_Y_LEVELS, -SPHERE_ORBITING_RADIUS );
//   sphereSkills.position.set( SPHERE_ORBITING_RADIUS, SPHERE_Y_LEVELS, 0 );
//   sphereMisc.position.set( 0, SPHERE_Y_LEVELS, SPHERE_ORBITING_RADIUS );
//   sphereWorkContainer = sphereTextureMapper(sphereWork, WORK_ICON_PATH);
//   sphereDegreeContainer = sphereTextureMapper(sphereDegree, DEGREE_ICON_PATH);
//   sphereSkillsContainer = sphereTextureMapper(sphereSkills, SKILLS_ICON_PATH);
//   sphereMiscContainer = sphereTextureMapper(sphereMisc, MISC_ICON_PATH);

//   rotatingGroup.add( sphereWork );
//   rotatingGroup.add( sphereWorkContainer );
  
//   rotatingGroup.add( sphereDegree );
//   rotatingGroup.add( sphereDegreeContainer );
  
//   rotatingGroup.add( sphereSkills );
//   rotatingGroup.add( sphereSkillsContainer );

//   rotatingGroup.add( sphereMisc );
//   rotatingGroup.add( sphereMiscContainer );

//   function sphereTextureMapper(sphere, texturePath) {
//     const spherePosition = new THREE.Vector3();
//     const sphereTexture = loader.load(texturePath);
//     var sphereIcon = new THREE.Mesh(
//       new THREE.CubeGeometry(75, 75, 100),
//       new THREE.MeshBasicMaterial({
//         color: 0x000000,
//         alphaMap : sphereTexture,
//         alphaTest : 0.01
//       })
//     );
//     sphere.getWorldPosition(spherePosition);
//     sphereIcon.position.set(spherePosition.x, spherePosition.y, spherePosition.z);
//     return sphereIcon;
//   }

//   // Lignes support section
//   material = new THREE.LineBasicMaterial({ color: 0xffffff });
//   geometry = new THREE.BufferGeometry().setFromPoints( 
//     [
//       new THREE.Vector3( 0, SPHERE_Y_LEVELS, 0 ),
//       new THREE.Vector3( 0, SPHERE_Y_LEVELS / 1.5, 0 ),
//       new THREE.Vector3( -850, SPHERE_Y_LEVELS / 1.5, 0 ),
//       new THREE.Vector3( -900, SPHERE_Y_LEVELS / 1.5 + 50, 0 ),
//       new THREE.Vector3( -850, SPHERE_Y_LEVELS / 1.5, 0 ),
//       new THREE.Vector3( 850, SPHERE_Y_LEVELS / 1.5, 0 ),
//       new THREE.Vector3( 900, SPHERE_Y_LEVELS / 1.5 + 50, 0 )
//     ]
//   );
//   linesSection = new THREE.Line( geometry, material );

//   //Support semi-transparent section
//   geometry = new THREE.ShapeBufferGeometry(new THREE.Shape(
//     [
//       new THREE.Vector3(-850, SPHERE_Y_LEVELS / 1.5, 0),
//       new THREE.Vector3(-900, SPHERE_Y_LEVELS / 1.5 + 50, 0),
//       new THREE.Vector3(-900, SPHERE_Y_LEVELS / 1.5 + 900, 0),
//       new THREE.Vector3(900, SPHERE_Y_LEVELS / 1.5 + 900, 0),
//       new THREE.Vector3(900, SPHERE_Y_LEVELS / 1.5 + 50, 0),
//       new THREE.Vector3(850, SPHERE_Y_LEVELS / 1.5, 0),
//       new THREE.Vector3(-850, SPHERE_Y_LEVELS / 1.5, 0)
//     ]
//   ));
//   material = new THREE.MeshBasicMaterial({color : 0xffffff, opacity : 0.1, transparent : true});
//   sectionPanel = new THREE.Mesh(geometry, material);

//   // POSTPROCESSING : Effet Bloom

//   var params = {
//     bloomStrength: 0.75,
//     bloomThreshold: 0.5,
//     bloomRadius: 0.01
//   };

//   composer = new EffectComposer(renderer);
//   composer.setSize( window.innerWidth, window.innerHeight );

//   var renderPass = new RenderPass(scene, camera);

//   var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),params.bloomStrength, params.bloomRadius, params.bloomThreshold, sphereDegree, scene, camera);
//   bloomPass.threshold = params.bloomThreshold;
//   bloomPass.strength = params.bloomStrength;
//   bloomPass.radius = params.bloomRadius;

//   composer.addPass(renderPass);
//   composer.addPass(bloomPass);

//   //EVENTS
//   window.addEventListener('mousemove', onMouseMove, false);

//   //3D HTML CONTENT
//   var infoElement = document.createElement('div');
//   var emailFormElement = document.createElement('div');
  
//   infoElement.innerHTML = infoSketch;
//   infoElement.style.position = 'absolute';
//   infoElement.style.top = '5em';
//   infoElement.style.width = '110em';
//   infoElement.style.height = '53em';
//   infoElement.style.fontFamily = 'Calibri Light, Calibri, sans-serif';

//   emailFormElement.innerHTML = emailFormSketch;
//   emailFormElement.style.position = 'absolute';
//   emailFormElement.style.top = '8em';
//   emailFormElement.style.width = '110em';
//   emailFormElement.style.height = '53em';
//   emailFormElement.style.fontFamily = 'Calibri Light, Calibri, sans-serif';
//   emailFormElement.style.zIndex = 1000;

//   infoDomObject = new CSS3DObject( infoElement );
//   emailFormDomObject = new CSS3DObject( emailFormElement );
//   emailFormDomObject.visible = false;
//   cssScene.add(infoDomObject);
//   cssScene.add(emailFormDomObject);
  
//   infoElement.getElementsByClassName('languageButton')[ FRENCH ].addEventListener('click', () => {
//     changeLanguage( FRENCH );
//     infoElement.getElementsByClassName('languageButton')[ FRENCH ].style.fontWeight = 'bold';
//     infoElement.getElementsByClassName('languageButton')[ ENGLISH ].style.fontWeight = 'normal';
//   });
//   infoElement.getElementsByClassName('languageButton')[ ENGLISH ].addEventListener('click', () => {
//     changeLanguage( ENGLISH );
//     infoElement.getElementsByClassName('languageButton')[ ENGLISH ].style.fontWeight = 'bold';
//     infoElement.getElementsByClassName('languageButton')[ FRENCH ].style.fontWeight = 'normal';
//   });

//   infoElement.getElementsByClassName('emailAddress')[0].addEventListener('click', () => {
//     displayEmailForm();
//   });

//   emailFormElement.getElementsByClassName('closeCross')[0].addEventListener('click', () => {
//     emailFormDomObject.visible = false;
//     infoDomObject.visible = true;
//   });

//   emailFormElement.getElementsByClassName('submitButton')[0].addEventListener('click', function(event) {
//     event.preventDefault();
//     Email.send({
//       SecureToken : "a0a26d4b-2eff-451b-9d67-9009a9712655",
//       To : 'stephane.petiot@hotmail.fr',
//       From : "stephane.petiot@hotmail.fr",
//       Subject : "TEST",
//       Body : "TEST"
//     }).then(
//     message => alert(message)
//     );
//   });

//   var workElement = document.createElement( 'div' );
//   workElement.innerHTML = workSketch;
//   workDomObject = createDomSection( workElement );
//   workDomObject.visible = false;
//   cssScene.add(workDomObject);
//   workSelected = false;

//   var degreeElement = document.createElement( 'div' );
//   degreeElement.innerHTML = degreeSketch;
//   degreeDomObject = createDomSection( degreeElement );
//   degreeDomObject.visible = false;
//   cssScene.add(degreeDomObject);
//   degreeSelected = false;

//   var skillsElement = document.createElement( 'div' );
//   skillsElement.innerHTML = skillsSketch;
//   skillsDomObject = createDomSection( skillsElement );
//   skillsDomObject.visible = false;
//   cssScene.add(skillsDomObject);
//   skillsSelected = false;

//   var miscElement = document.createElement( 'div' );
//   miscElement.innerHTML = miscSketch;
//   miscDomObject = createDomSection( miscElement );
//   miscDomObject.visible = false;
//   cssScene.add(miscDomObject);
//   miscSelected = false;

//   function createDomSection( section ) {
//     section.style.position = 'absolute';
//     section.style.top = '9em';
//     section.style.width = '110em';
//     section.style.height = '53em';

//     var domObject = new CSS3DObject( section );
//     return domObject;
//   }

//   //LOADER
//   document.getElementById("loader").style.opacity = 0;
//   setTimeout(function(){document.getElementById("loader").style.display = "none";}, 1750);
// }

// function displayEmailForm() {
//   infoDomObject.visible = false;
//   emailFormDomObject.visible = true;
// }

// function onMouseMove(event) {
//   event.preventDefault();

//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//   rayCaster.setFromCamera(mouse, camera);

//   intersectWork = rayCaster.intersectObject(sphereWork, true);
//   intersectDegree = rayCaster.intersectObject(sphereDegree, true);
//   intersectSkills = rayCaster.intersectObject(sphereSkills, true);
//   intersectMisc = rayCaster.intersectObject(sphereMisc, true);
  
//   if (intersectWork.length > 0 && !workSelected) {
//     displaySection( WORK_SECTION );
//     window.removeEventListener('mousemove', onMouseMove);
//     window.addEventListener('mousemove', function workLeaveWatcher(event) {
//       event.preventDefault();

//       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//       rayCaster.setFromCamera(mouse, camera);

//       intersectWork = rayCaster.intersectObject(sphereWork, true);

//       if (intersectWork.length === 0) {
//         workSelected = !workSelected;
//         sphereWork.scale.set(1, 1, 1);
//         sphereWorkContainer.scale.set(1, 1, 1);
//         sphereMaterial.opacity = 1;
//         sphereWork.material = sphereMaterial;
//         scene.remove(linesSection);
//         scene.remove(sectionPanel);
//         workDomObject.visible = false;
//         cssScene.add(infoDomObject);
//         window.removeEventListener('mousemove', workLeaveWatcher);
//         window.addEventListener('mousemove', onMouseMove);
//       }
//     });
//   }
//   else if (intersectDegree.length > 0 && !degreeSelected) {
//     displaySection( DEGREE_SECTION );
//     window.removeEventListener('mousemove', onMouseMove);
//     window.addEventListener('mousemove', function degreeLeaveWatcher(event) {
//       event.preventDefault();

//       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//       rayCaster.setFromCamera(mouse, camera);

//       intersectDegree = rayCaster.intersectObject(sphereDegree, true);

//       if (intersectDegree.length === 0) {
//         degreeSelected = !degreeSelected;
//         sphereDegree.scale.set(1, 1, 1);
//         sphereDegreeContainer.scale.set(1, 1, 1);
//         sphereMaterial.opacity = 1;
//         sphereDegree.material = sphereMaterial;
//         scene.remove(linesSection);
//         scene.remove(sectionPanel);
//         degreeDomObject.visible = false;
//         cssScene.add(infoDomObject);
//         window.removeEventListener('mousemove', degreeLeaveWatcher);
//         window.addEventListener('mousemove', onMouseMove);
//       }
//     });
//   }
//   else if (intersectSkills.length > 0 && !skillsSelected) {
//     displaySection( SKILLS_SECTION );
//     window.removeEventListener('mousemove', onMouseMove);
//     window.addEventListener('mousemove', function skillsLeaveWatcher(event) {
//       event.preventDefault();

//       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//       rayCaster.setFromCamera(mouse, camera);

//       intersectSkills = rayCaster.intersectObject(sphereSkills, true);

//       if (intersectSkills.length === 0) {
//         skillsSelected = !skillsSelected;
//         sphereSkills.scale.set(1, 1, 1);
//         sphereSkillsContainer.scale.set(1, 1, 1);
//         sphereMaterial.opacity = 1;
//         sphereSkills.material = sphereMaterial;
//         scene.remove(linesSection);
//         scene.remove(sectionPanel);
//         skillsDomObject.visible = false;
//         cssScene.add(infoDomObject);
//         window.removeEventListener('mousemove', skillsLeaveWatcher);
//         window.addEventListener('mousemove', onMouseMove);
//       }
//     });
//   }
//   else if (intersectMisc.length > 0 && !miscSelected) {
//     displaySection( MISC_SECTION );
//     window.removeEventListener('mousemove', onMouseMove);
//     window.addEventListener('mousemove', function miscLeaveWatcher(event) {
//       event.preventDefault();

//       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//       rayCaster.setFromCamera(mouse, camera);

//       intersectMisc = rayCaster.intersectObject(sphereMisc, true);

//       if (intersectMisc.length === 0) {
//         miscSelected = !miscSelected;
//         sphereMisc.scale.set(1, 1, 1);
//         sphereMiscContainer.scale.set(1, 1, 1);
//         sphereMaterial.opacity = 1;
//         sphereMisc.material = sphereMaterial;
//         scene.remove(linesSection);
//         scene.remove(sectionPanel);
//         miscDomObject.visible = false;
//         cssScene.add(infoDomObject);
//         window.removeEventListener('mousemove', miscLeaveWatcher);
//         window.addEventListener('mousemove', onMouseMove);
//       }
//     });
//   }
// }

// function displaySection( sectionID )
// {
//   var targets = [];
//   switch( sectionID ) {
//     case WORK_SECTION :
//       workSelected = !workSelected;
//       sphereWork.scale.set(1.1, 1.1, 1.1);
//       sphereWorkContainer.scale.set(1.1, 1.1, 1.1);
//       sphereMaterial.opacity = 0.5;
//       sphereWork.material = sphereSelectedMaterial;

//       targets.push( { x : sphereWork.position.x, y : SPHERE_Y_LEVELS, z : sphereWork.position.z } );
//       targets.push( { x : 0, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
      
//       workDomObject.visible = true;
//       break;
//     case DEGREE_SECTION :
//       degreeSelected = !degreeSelected;
//       sphereDegree.scale.set(1.1, 1.1, 1.1);
//       sphereDegreeContainer.scale.set(1.1, 1.1, 1.1);
//       sphereMaterial.opacity = 0.5;
//       sphereDegree.material = sphereSelectedMaterial;

//       targets.push( { x : sphereDegree.position.x, y : SPHERE_Y_LEVELS, z : sphereDegree.position.z } );
//       targets.push( { x : 0, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
      
//       degreeDomObject.visible = true;
//       break;
//     case SKILLS_SECTION :
//       skillsSelected = !skillsSelected;
//       sphereSkills.scale.set(1.1, 1.1, 1.1);
//       sphereSkillsContainer.scale.set(1.1, 1.1, 1.1);
//       sphereMaterial.opacity = 0.5;
//       sphereSkills.material = sphereSelectedMaterial;

//       targets.push( { x : sphereSkills.position.x, y : SPHERE_Y_LEVELS, z : sphereSkills.position.z } );
//       targets.push( { x : 0, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
      
//       skillsDomObject.visible = true;
//       break;
//     case MISC_SECTION :
//       miscSelected = !miscSelected;
//       sphereMisc.scale.set(1.1, 1.1, 1.1);
//       sphereMiscContainer.scale.set(1.1, 1.1, 1.1);
//       sphereMaterial.opacity = 0.5;
//       sphereMisc.material = sphereSelectedMaterial;

//       targets.push( { x : sphereMisc.position.x, y : SPHERE_Y_LEVELS, z : sphereMisc.position.z } );
//       targets.push( { x : 0, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
      
//       miscDomObject.visible = true;
//       break;
//     default :
//       break;
//   }

//   /* targets.push( { x : 0, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
//   targets.push( { x : -850, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );

//   targets.push( { x : 0, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
//   targets.push( { x : 850, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
  
//   targets.push( { x : -850, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
//   targets.push( { x : -900, y : SPHERE_Y_LEVELS / 1.5 + 50, z : 0 } );

//   targets.push( { x : 850, y : SPHERE_Y_LEVELS / 1.5, z : 0 } );
//   targets.push( { x : 900, y : SPHERE_Y_LEVELS / 1.5 + 50, z : 0 } );

//   var tweens = [];
//   tweens.push(new TWEEN.Tween(targets[0]).to(targets[1], 1000));
//   tweens.push(new TWEEN.Tween(targets[2]).to(targets[3], 1000));
//   tweens.push(new TWEEN.Tween(targets[4]).to(targets[5], 1000));
//   tweens.push(new TWEEN.Tween(targets[6]).to(targets[7], 1000));
//   tweens.push(new TWEEN.Tween(targets[8]).to(targets[9], 1000));

//   tweens[0].chain(tweens[1], tweens[2]);
//   tweens[1].chain(tweens[3]);
//   tweens[2].chain(tweens[4]);

//   tweens[0].onUpdate(function(){
//     linesSection.geometry.attributes.position.array[3] = targets[0].x;
//     linesSection.geometry.attributes.position.array[4] = targets[0].y;
//     linesSection.geometry.attributes.position.array[5] = targets[0].z;
    
//     linesSection.geometry.attributes.position.needsUpdate = true;
//   });
//   tweens[1].onUpdate(function(){
//     linesSection.geometry.attributes.position.array[6] = targets[2].x;
//     linesSection.geometry.attributes.position.array[7] = targets[2].y;
//     linesSection.geometry.attributes.position.array[8] = targets[2].z;

//     linesSection.geometry.attributes.position.needsUpdate = true;
//   });
//   tweens[2].onUpdate(function(){
//     linesSection.geometry.attributes.position.array[15] = targets[4].x;
//     linesSection.geometry.attributes.position.array[16] = targets[4].y;
//     linesSection.geometry.attributes.position.array[17] = targets[4].z;
    
//     linesSection.geometry.attributes.position.needsUpdate = true;
//   });
//   tweens[3].onUpdate(function(){
//     linesSection.geometry.attributes.position.array[9] = targets[6].x;
//     linesSection.geometry.attributes.position.array[10] = targets[6].y;
//     linesSection.geometry.attributes.position.array[11] = targets[6].z;
    
//     linesSection.geometry.attributes.position.needsUpdate = true;
//   });
//   tweens[4].onUpdate(function(){
//     linesSection.geometry.attributes.position.array[18] = targets[8].x;
//     linesSection.geometry.attributes.position.array[19] = targets[8].y;
//     linesSection.geometry.attributes.position.array[20] = targets[8].z;
    
//     linesSection.geometry.attributes.position.needsUpdate = true;
//   }); */

//   //tweens[0].start();
//   scene.add(linesSection);
//   scene.add(sectionPanel);
//   cssScene.remove(infoDomObject);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize( window.innerWidth, window.innerHeight );
//   cssRenderer.setSize( window.innerWidth, window.innerHeight );
//   composer.setSize( window.innerWidth, window.innerHeight );
// }

// function updateLinePositions() {
//   const worldPosition = new THREE.Vector3();

//   if(workSelected)
//     sphereWork.getWorldPosition(worldPosition);
//   else if(degreeSelected)
//     sphereDegree.getWorldPosition(worldPosition);
//   else if(skillsSelected)
//     sphereSkills.getWorldPosition(worldPosition);
//   else if(miscSelected)
//     sphereMisc.getWorldPosition(worldPosition);
  
//   linesSection.geometry.attributes.position.array[0] = worldPosition.x;
//   linesSection.geometry.attributes.position.array[1] = worldPosition.y;
//   linesSection.geometry.attributes.position.array[2] = worldPosition.z;
//   linesSection.geometry.attributes.position.needsUpdate = true;
// }
// function animate() {
//   requestAnimationFrame( animate );

//   var vertexpos = 0;
//   var colorpos = 0;
//   var numConnected = 0;

//   for ( var i = 0; i < particleCount; i ++ )
//     particlesData[ i ].numConnections = 0;

//   for ( var i = 0; i < particleCount; i ++ ) {
//     // get the particle
//     var particleData = particlesData[ i ];

//     particlePositions[ i * 3 ] += particleData.velocity.x;
//     particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
//     particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

//     if ( particlePositions[ i * 3 + 1 ] < - rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
//       particleData.velocity.y = - particleData.velocity.y;

//     if ( particlePositions[ i * 3 ] < - rHalf || particlePositions[ i * 3 ] > rHalf )
//       particleData.velocity.x = - particleData.velocity.x;

//     if ( particlePositions[ i * 3 + 2 ] < - rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
//       particleData.velocity.z = - particleData.velocity.z;

//     if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
//       continue;

//     // Check collision
//     for ( var j = i + 1; j < particleCount; j ++ ) {
//       var particleDataB = particlesData[ j ];
//       if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
//         continue;

//       var dx = particlePositions[ i * 3 ] - particlePositions[ j * 3 ];
//       var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
//       var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
//       var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

//       if ( dist < effectController.minDistance ) {
//         particleData.numConnections ++;
//         particleDataB.numConnections ++;

//         var alpha = 1.0 - dist / effectController.minDistance;

//         positions[ vertexpos ++ ] = particlePositions[ i * 3 ];
//         positions[ vertexpos ++ ] = particlePositions[ i * 3 + 1 ];
//         positions[ vertexpos ++ ] = particlePositions[ i * 3 + 2 ];

//         positions[ vertexpos ++ ] = particlePositions[ j * 3 ];
//         positions[ vertexpos ++ ] = particlePositions[ j * 3 + 1 ];
//         positions[ vertexpos ++ ] = particlePositions[ j * 3 + 2 ];

//         colors[ colorpos ++ ] = alpha;
//         colors[ colorpos ++ ] = alpha;
//         colors[ colorpos ++ ] = alpha;

//         colors[ colorpos ++ ] = alpha;
//         colors[ colorpos ++ ] = alpha;
//         colors[ colorpos ++ ] = alpha;

//         numConnected ++;
//       }
//     }
//   }

//   linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
//   linesMesh.geometry.attributes.position.needsUpdate = true;
//   linesMesh.geometry.attributes.color.needsUpdate = true;

//   pointCloud.geometry.attributes.position.needsUpdate = true;

//   var time = Date.now() * 0.001;

//   rotatingGroup.rotation.y = time * 0.1;

//   updateLinePositions();

//   sphereWorkContainer.lookAt(camera.position);
//   sphereDegreeContainer.lookAt(camera.position);
//   sphereSkillsContainer.lookAt(camera.position);
//   sphereMiscContainer.lookAt(camera.position);

//   //TWEEN.update();

//   render();
// }

// function render() {
//   renderer.render( scene, camera );
//   cssRenderer.render( cssScene, camera );
//   composer.render();
// }