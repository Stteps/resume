import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { gsap } from "gsap";

import { subdivideSegments } from '../utils';
import MainPanel from '../components/MainPanel/MainPanel';
import WorkPanel from '../components/WorkPanel/WorkPanel';
import EducationPanel from '../components/EducationPanel/EducationPanel';
import SkillsPanel from '../components/SkillsPanel/SkillsPanel';
import MiscellaneousPanel from '../components/MiscellaneousPanel/MiscellaneousPanel';

import background from "~/assets/images/background_1.jpg";
import workIcon from "~/assets/icons/work.png";
import educationIcon from "~/assets/icons/education.png";
import skillsIcon from "~/assets/icons/skills.png";
import miscellaneousIcon from "~/assets/icons/miscellaneous.png";


const SPHERE_Y_LEVELS = -500, SPHERE_ORBITING_RADIUS = 500;
const SECTIONS = {
  WORK: 0,
  EDUCATION: 1,
  SKILLS: 2,
  MISCELLANEOUS: 3
};


// Set up scene, camera, renderer
const scene = new THREE.Scene();
const cssScene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha : true });
const composer = new EffectComposer(renderer);
const cssRenderer = new CSS3DRenderer();

var camera;

var controls;

const loader = new THREE.TextureLoader();

// Mouse Manager
const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const light = new THREE.AmbientLight("white", 0.6);

const rotatingGroup = new THREE.Group();

const maxParticleCount = 1000;
const particlePositions = new Float32Array(maxParticleCount * 3);
const particleCount = 750;
const r = 2500;
const rHalf = r / 2;

const effectController = {
  showDots: true,
  showLines: true,
  minDistance: 150,
  limitConnections: true,
  maxConnections: 20,
  particleCount: 500
};

const postProcessingParams = {
  bloomStrength: 0.75,
  bloomThreshold: 0.5,
  bloomRadius: 0.01
};

const particlesData = [];
for (let i = 0; i < maxParticleCount; i++) {
  var x = Math.random() * r - r / 2;
  var y = Math.random() * r - r / 2;
  var z = Math.random() * r - r / 2;

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;

  // Add it to the geometry
  particlesData.push({
    velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
    numConnections: 0
  });
}

const IndexApp = () => {
  const [selectedSection, setSelectedSection] = useState();

  const selectedSectionRef = useRef();
  const mountRef = useRef(null);

  useEffect(() => {
    selectedSectionRef.current = selectedSection;
  }, [selectedSection]);

  useEffect(() => {
    // Load and set background
    loader.load(background, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture;
    });

    camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 1, 4000);
    camera.position.z = 1850;

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(mountRef.current.devicePixelRatio);
    cssRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    mountRef.current.appendChild(renderer.domElement);
    mountRef.current.appendChild(cssRenderer.domElement);
    
    // Controles
    controls = new OrbitControls( camera, mountRef.current );
    controls.minDistance = 1000;
    controls.maxDistance = 3000;

    // Lumières
    scene.add(light);

    // POSTPROCESSING : Effet Bloom
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(mountRef.current.clientWidth, mountRef.current.clientHeight), postProcessingParams.bloomStrength, postProcessingParams.bloomRadius, postProcessingParams.bloomThreshold);

    composer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    // 3D OBJECTS INITIALIZATION
    // Groupe objets orbitants
    scene.add(rotatingGroup);

    // Nuage de points et segments
    const segments = maxParticleCount * maxParticleCount;	    // Nombre de connexions possibles
    const positions = new Float32Array(segments * 3);	        // Coordonnées des points
    const colors = new Float32Array(segments * 3);	          // Couleurs des points
    
    const particles = new THREE.BufferGeometry();
    particles.setDrawRange(0, particleCount);
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const pointCloud = new THREE.Points(
      particles,
      new THREE.PointsMaterial({
        color: "white",
        size: 1.1,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false
      })
    );
    
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.computeBoundingSphere();
    linesGeometry.setDrawRange(0, 0);
    const linesMesh = new THREE.LineSegments(
      linesGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true
      })
    );
    rotatingGroup.add(pointCloud);
    rotatingGroup.add(linesMesh);

    // Spheres
    const sphereTextureMapper = (sphere, texturePath) => {
      const spherePosition = new THREE.Vector3();
      const texture = loader.load(texturePath);

      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);

      // Position in front of the sphere
      sphere.getWorldPosition(spherePosition);
      plane.position.copy(spherePosition).add(new THREE.Vector3(50, 0, 0)); // offset forward
      plane.lookAt(camera.position); // optional: make it always face the camera

      return plane;
    };

    const sphereWork = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ color: "skyblue" }));
    const sphereDegree = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ color: "skyblue" }));
    const sphereSkills = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ color: "skyblue" }));
    const sphereMisc = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ color: "skyblue" }));

    sphereWork.position.set(-SPHERE_ORBITING_RADIUS, SPHERE_Y_LEVELS, 0);
    sphereDegree.position.set(0, SPHERE_Y_LEVELS, -SPHERE_ORBITING_RADIUS);
    sphereSkills.position.set(SPHERE_ORBITING_RADIUS, SPHERE_Y_LEVELS, 0);
    sphereMisc.position.set(0, SPHERE_Y_LEVELS, SPHERE_ORBITING_RADIUS);
    const sphereWorkContainer = sphereTextureMapper(sphereWork, workIcon);
    const sphereDegreeContainer = sphereTextureMapper(sphereDegree, educationIcon);
    const sphereSkillsContainer = sphereTextureMapper(sphereSkills, skillsIcon);
    const sphereMiscContainer = sphereTextureMapper(sphereMisc, miscellaneousIcon);

    rotatingGroup.add(sphereWork);
    rotatingGroup.add(sphereWorkContainer);
    
    rotatingGroup.add(sphereDegree);
    rotatingGroup.add(sphereDegreeContainer);
    
    rotatingGroup.add(sphereSkills);
    rotatingGroup.add(sphereSkillsContainer);

    rotatingGroup.add(sphereMisc);
    rotatingGroup.add(sphereMiscContainer);

    // 3D HTML CONTENT
    const mainDomObject = new THREE.Group();
    const mainFrontDomObject = new CSS3DObject(document.getElementById('main-content'));
    const mainBackDomObject = new CSS3DObject(document.getElementById('main-content-mirrored'));
    mainBackDomObject.rotation.y = Math.PI;
    mainDomObject.add(mainFrontDomObject);
    mainDomObject.add(mainBackDomObject);
    cssScene.add(mainDomObject);

    const panelDomObject = new THREE.Group();
    const panelFrontDomObject = new CSS3DObject(document.getElementById('panel-content'));
    const panelBackDomObject = new CSS3DObject(document.getElementById('panel-content-mirrored'));
    panelBackDomObject.rotation.y = Math.PI;
    panelDomObject.add(panelFrontDomObject);
    panelDomObject.add(panelBackDomObject);
    cssScene.add(panelDomObject);

    // Lignes support section
    const panelLinesPoints = subdivideSegments([
      new THREE.Vector3(0, SPHERE_Y_LEVELS, 0),
      new THREE.Vector3(0, SPHERE_Y_LEVELS / 1.5, 0),
      new THREE.Vector3(-850, SPHERE_Y_LEVELS / 1.5, 0),
      new THREE.Vector3(-900, SPHERE_Y_LEVELS / 1.5 + 50, 0),
      new THREE.Vector3(-850, SPHERE_Y_LEVELS / 1.5, 0),
      new THREE.Vector3(850, SPHERE_Y_LEVELS / 1.5, 0),
      new THREE.Vector3(900, SPHERE_Y_LEVELS / 1.5 + 50, 0)
    ], 20);
    const panelLinesGeometry = new THREE.BufferGeometry().setFromPoints(panelLinesPoints);
    const panelLines = new THREE.Line(panelLinesGeometry, new THREE.LineBasicMaterial({ color: "white" }));
    scene.add(panelLines);

    // Support semi-transparent section
    const panelMaterial = new THREE.MeshBasicMaterial({ color: "white", opacity: 0.1, transparent: true, side: THREE.DoubleSide });
    const sectionPanel = new THREE.Mesh(
      new THREE.ShapeGeometry(
        new THREE.Shape([
          new THREE.Vector3(-850, SPHERE_Y_LEVELS / 1.5, 0),
          new THREE.Vector3(-900, SPHERE_Y_LEVELS / 1.5 + 50, 0),
          new THREE.Vector3(-900, SPHERE_Y_LEVELS / 1.5 + 900, 0),
          new THREE.Vector3(900, SPHERE_Y_LEVELS / 1.5 + 900, 0),
          new THREE.Vector3(900, SPHERE_Y_LEVELS / 1.5 + 50, 0),
          new THREE.Vector3(850, SPHERE_Y_LEVELS / 1.5, 0),
          new THREE.Vector3(-850, SPHERE_Y_LEVELS / 1.5, 0)
        ])
      ),
      panelMaterial
    );
    scene.add(sectionPanel);
    hidePanel(panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject, 0);

    const onMouseMove = (event) => {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      rayCaster.setFromCamera(mouse, camera);

      var intersectWork = rayCaster.intersectObject(sphereWork, true);
      var intersectDegree = rayCaster.intersectObject(sphereDegree, true);
      var intersectSkills = rayCaster.intersectObject(sphereSkills, true);
      var intersectMisc = rayCaster.intersectObject(sphereMisc, true);
      
      if (intersectWork.length > 0) {
        displaySection(SECTIONS.WORK);
        window.removeEventListener('mousemove', onMouseMove);
        window.addEventListener('mousemove', function workLeaveWatcher(event) {
          event.preventDefault();
          document.body.style.cursor = 'pointer';

          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          rayCaster.setFromCamera(mouse, camera);

          intersectWork = rayCaster.intersectObject(sphereWork, true);

          if (intersectWork.length === 0) {
            document.body.style.cursor = 'default';
            setSelectedSection();
            gsap.to(sphereWork.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereWorkContainer.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereWork.material.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
            hidePanel(panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject);
            window.removeEventListener('mousemove', workLeaveWatcher);
            window.addEventListener('mousemove', onMouseMove);
          }
        });
      }
      else if (intersectDegree.length > 0) {
        displaySection(SECTIONS.EDUCATION);
        window.removeEventListener('mousemove', onMouseMove);
        window.addEventListener('mousemove', function degreeLeaveWatcher(event) {
          event.preventDefault();
          document.body.style.cursor = 'pointer';

          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          rayCaster.setFromCamera(mouse, camera);

          intersectDegree = rayCaster.intersectObject(sphereDegree, true);

          if (intersectDegree.length === 0) {
            document.body.style.cursor = 'default';
            setSelectedSection();
            gsap.to(sphereDegree.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereDegreeContainer.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereDegree.material.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
            hidePanel(panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject);
            window.removeEventListener('mousemove', degreeLeaveWatcher);
            window.addEventListener('mousemove', onMouseMove);
          }
        });
      }
      else if (intersectSkills.length > 0) {
        displaySection(SECTIONS.SKILLS);
        window.removeEventListener('mousemove', onMouseMove);
        window.addEventListener('mousemove', function skillsLeaveWatcher(event) {
          event.preventDefault();
          document.body.style.cursor = 'pointer';

          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          rayCaster.setFromCamera(mouse, camera);

          intersectSkills = rayCaster.intersectObject(sphereSkills, true);

          if (intersectSkills.length === 0) {
            document.body.style.cursor = 'default';
            setSelectedSection();
            gsap.to(sphereSkills.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereSkillsContainer.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereSkills.material.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
            hidePanel(panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject);
            window.removeEventListener('mousemove', skillsLeaveWatcher);
            window.addEventListener('mousemove', onMouseMove);
          }
        });
      }
      else if (intersectMisc.length > 0) {
        displaySection(SECTIONS.MISCELLANEOUS);
        window.removeEventListener('mousemove', onMouseMove);
        window.addEventListener('mousemove', function miscLeaveWatcher(event) {
          event.preventDefault();
          document.body.style.cursor = 'pointer';

          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          rayCaster.setFromCamera(mouse, camera);

          intersectMisc = rayCaster.intersectObject(sphereMisc, true);

          if (intersectMisc.length === 0) {
            document.body.style.cursor = 'default';
            setSelectedSection();
            gsap.to(sphereMisc.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereMiscContainer.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(sphereMisc.material.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
            hidePanel(panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject);
            window.removeEventListener('mousemove', miscLeaveWatcher);
            window.addEventListener('mousemove', onMouseMove);
          }
        });
      }
    };

    const displaySection = (sectionID) => {
      switch (sectionID) {
        case SECTIONS.WORK :
          setSelectedSection(SECTIONS.WORK);
          gsap.to(sphereWork.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereWorkContainer.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereWork.material.color, { ...new THREE.Color('white'), duration: 0.5 });
          break;
        case SECTIONS.EDUCATION :
          setSelectedSection(SECTIONS.EDUCATION);
          gsap.to(sphereDegree.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereDegreeContainer.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereDegree.material.color, { ...new THREE.Color('white'), duration: 0.5 });
          break;
        case SECTIONS.SKILLS :
          setSelectedSection(SECTIONS.SKILLS);
          gsap.to(sphereSkills.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereSkillsContainer.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereSkills.material.color, { ...new THREE.Color('white'), duration: 0.5 });
          break;
        case SECTIONS.MISCELLANEOUS :
          setSelectedSection(SECTIONS.MISCELLANEOUS);
          gsap.to(sphereMisc.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereMiscContainer.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(sphereMisc.material.color, { ...new THREE.Color('white'), duration: 0.5 });
          break;
        default :
          break;
      }

      showPanel(panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject);
    };

    // EVENTS
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      requestAnimationFrame(animate);

      var vertexpos = 0;
      var colorpos = 0;
      var numConnected = 0;

      for (let i = 0; i < particleCount; i++)
        particlesData[i].numConnections = 0;

      for (let i = 0; i < particleCount; i++) {
        // get the particle
        var particleData = particlesData[i];

        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
          particleData.velocity.y = - particleData.velocity.y;

        if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
          particleData.velocity.x = - particleData.velocity.x;

        if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
          particleData.velocity.z = -particleData.velocity.z;

        if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
          continue;

        // Check collision
        for (let j = i + 1; j < particleCount; j++) {
          var particleDataB = particlesData[j];
          if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
            continue;

          var dx = particlePositions[i * 3] - particlePositions[j * 3];
          var dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          var dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < effectController.minDistance) {
            particleData.numConnections++;
            particleDataB.numConnections++;

            var alpha = 1.0 - dist / effectController.minDistance;

            positions[vertexpos++] = particlePositions[i * 3];
            positions[vertexpos++] = particlePositions[i * 3 + 1];
            positions[vertexpos++] = particlePositions[i * 3 + 2];

            positions[vertexpos++] = particlePositions[j * 3];
            positions[vertexpos++] = particlePositions[j * 3 + 1];
            positions[vertexpos++] = particlePositions[j * 3 + 2];

            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;

            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;

            numConnected++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;

      pointCloud.geometry.attributes.position.needsUpdate = true;

      const time = Date.now() * 0.001;

      rotatingGroup.rotation.y = time * 0.1;

      const pos = new THREE.Vector3();
      if (selectedSectionRef.current == SECTIONS.WORK)
        sphereWork.getWorldPosition(pos);
      else if (selectedSectionRef.current == SECTIONS.EDUCATION)
        sphereDegree.getWorldPosition(pos);
      else if (selectedSectionRef.current == SECTIONS.SKILLS)
        sphereSkills.getWorldPosition(pos);
      else if (selectedSectionRef.current == SECTIONS.MISCELLANEOUS)
        sphereMisc.getWorldPosition(pos);
      else 
        pos.set(0, SPHERE_Y_LEVELS, 0);
      panelLines.geometry.attributes.position.setXYZ(0, pos.x, pos.y, pos.z);
      panelLines.geometry.attributes.position.needsUpdate = true;

      sphereWorkContainer.lookAt(camera.position);
      sphereDegreeContainer.lookAt(camera.position);
      sphereSkillsContainer.lookAt(camera.position);
      sphereMiscContainer.lookAt(camera.position);

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
      composer.render();
    };

    animate();

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const onWindowResize = () => {
    camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    cssRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    composer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
  };

  const showPanel = (panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject, duration = 0.7) => {
    gsap.to(mainDomObject.children[0].element.style, { opacity: 0, duration: 0.75/5 * duration, ease: "power2.out" });
    gsap.to(mainDomObject.children[1].element.style, { opacity: 0, duration: 0.75/5 * duration, ease: "power2.out" });

    const tl = gsap.timeline();

    // LINES
    const linesDrawData = { count: 0 };
    tl.to(linesDrawData, { count: panelLinesGeometry.attributes.position.count, duration: 5/7 * duration, ease: "power2.out", onUpdate: () => { panelLinesGeometry.setDrawRange(0, linesDrawData.count); } });
  
    // PANEL
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -SPHERE_Y_LEVELS / 1.5 - 900);
    panelMaterial.clippingPlanes = [clipPlane];
    panelMaterial.clipShadows = true;
    panelMaterial.transparent = true;
    renderer.localClippingEnabled = true;
    tl.to(clipPlane, { constant: -SPHERE_Y_LEVELS / 1.5 + 900, duration: 2/7 * duration, ease: "power2.out" });
  
    tl.to(panelDomObject.children[0].element.style, { opacity: 1, duration: 0.75/5 * duration, ease: "power2.out" });
    tl.to(panelDomObject.children[1].element.style, { opacity: 1, duration: 0, ease: "power2.out" });
  };

  const hidePanel = (panelLinesGeometry, panelMaterial, mainDomObject, panelDomObject, duration = 1.0) => {
    gsap.to(panelDomObject.children[0].element.style, { opacity: 0, duration: 0.75/5 * duration, ease: "power2.out" });
    gsap.to(panelDomObject.children[1].element.style, { opacity: 0, duration: 0.75/5 * duration, ease: "power2.out" });
    const tl = gsap.timeline();

    // PANEL
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -SPHERE_Y_LEVELS / 1.5 + 900);
    panelMaterial.clippingPlanes = [clipPlane];
    panelMaterial.clipShadows = true;
    panelMaterial.transparent = true;
    renderer.localClippingEnabled = true;
    tl.to(clipPlane, { constant: -SPHERE_Y_LEVELS / 1.5 - 900, duration: 1/5 * duration, ease: "power2.out" });

    // LINES
    const linesDrawData = { count: panelLinesGeometry.attributes.position.count };
    tl.to(linesDrawData, { count: 0, duration: 1/2 * duration, ease: "power2.out", onUpdate: () => { panelLinesGeometry.setDrawRange(0, linesDrawData.count); } });
    
    tl.to(mainDomObject.children[0].element.style, { opacity: 1, duration: 0.75/5 * duration, ease: "power2.out" });
    tl.to(mainDomObject.children[1].element.style, { opacity: 1, duration: 0, ease: "power2.out" });
  };

  return <>
    {
      Array.from(["", "-mirrored"]).map(suffix => {
        return <>
          <div
            id = { `main-content${suffix}` }
            className = 'position-absolute'
            style = {{
              width: 1800,
              height: 850,
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              transform: `rotate(${suffix == "-mirrored" ? 180 : 0}deg)`,
              top: 142.5,  // TODO: Magic value
              zIndex: 1,
            }}
          >
            <MainPanel />
          </div>
          <div
            id = { `panel-content${suffix}` }
            className = 'position-absolute overflow-hidden'
            style = {{
              width: 1800,
              height: 850,
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              transform: `rotate(${suffix == "-mirrored" ? 180 : 0}deg)`,
              top: 142.5  // TODO: Magic value
            }}
          >
            { selectedSection == SECTIONS.WORK ? <WorkPanel /> : null }
            { selectedSection == SECTIONS.EDUCATION ? <EducationPanel /> : null }
            { selectedSection == SECTIONS.SKILLS ? <SkillsPanel /> : null }
            { selectedSection == SECTIONS.MISCELLANEOUS ? <MiscellaneousPanel /> : null }
          </div>
        </>;
      })
    }
    <div className = 'w-100 h-100' ref = { mountRef }></div>
  </>;
};

export default IndexApp;