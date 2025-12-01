import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { gsap } from "gsap";
import Modal from 'react-bootstrap/Modal';

import { subdivideSegments } from '../utils';
import MainPanel from '../components/MainPanel/MainPanel';
import WorkPanel from '../components/WorkPanel/WorkPanel';
import EducationPanel from '../components/EducationPanel/EducationPanel';
import SkillsPanel from '../components/SkillsPanel/SkillsPanel';
import PortfolioPanel from '../components/PortfolioPanel/PortfolioPanel';

import background from "~/assets/images/background.jpg";
import workIcon from "~/assets/images/work.jpg";
import educationIcon from "~/assets/images/education.jpg";
import skillsIcon from "~/assets/images/skills.jpg";
import portfolioIcon from "~/assets/images/portfolio.jpg";
import frIcon from "~/assets/icons/fr.svg";
import enIcon from "~/assets/icons/en.svg";

import workMeshData from "~/assets/meshes/work.stl";
import educationMeshData from "~/assets/meshes/education.stl";
import skillsMeshData from "~/assets/meshes/skills.stl";
import portfolioMeshData from "~/assets/meshes/portfolio.stl";


const SPHERE_Y_LEVELS = -500, SPHERE_ORBITING_RADIUS = 500;
const SECTIONS = {
  WORK: 0,
  EDUCATION: 1,
  SKILLS: 2,
  PORTFOLIO: 3
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
const stlLoader = new STLLoader();

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

const workMeshTargets = new Float32Array(maxParticleCount * 3);
const educationMeshTargets = new Float32Array(maxParticleCount * 3);
const skillsMeshTargets = new Float32Array(maxParticleCount * 3);
const portfolioMeshTargets = new Float32Array(maxParticleCount * 3);

const tl = gsap.timeline();

const IndexApp = () => {
  const { t, i18n } = useTranslation(["common", "glossary", "Index/IndexApp"]);

  const [hoveredSection, setHoveredSection] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const [showPdfModal, setShowPdfModal] = useState(false);

  const hoveredSectionRef = useRef();
  const selectedSectionRef = useRef();
  const mountRef = useRef(null);

  useEffect(() => {
    hoveredSectionRef.current = hoveredSection;
  }, [hoveredSection]);

  useEffect(() => {
    selectedSectionRef.current = selectedSection;
  }, [selectedSection]);

  useEffect(() => {
    // Load and set background
    loader.load(background, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture;
    });

    const loadSTLGeometry = (stlLoader, stlData, meshName, target) => {
      stlLoader.load(stlData, (geometry) => {
        const position = new THREE.Vector3(0, SPHERE_Y_LEVELS, 0);
        const scale = new THREE.Vector3(2, 2, 2);

        const matrix = new THREE.Matrix4().compose(position, new THREE.Quaternion(), scale);

        geometry.applyMatrix4(matrix);

        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 'white', wireframe: true, transparent: true, opacity: 0, depthTest: false }));
        mesh.name = meshName;
        // mesh.visible = false;
        rotatingGroup.add(mesh);
        const sampler = new MeshSurfaceSampler(mesh).build();
        const tempPosition = new THREE.Vector3();
        for(let i = 0; i < particleCount; i++) {
          sampler.sample(tempPosition);
          target[i * 3] = tempPosition.x;
          target[i * 3 + 1] = tempPosition.y;
          target[i * 3 + 2] = tempPosition.z;
        }
      });
    };
    loadSTLGeometry(stlLoader, workMeshData, "workMesh", workMeshTargets);
    loadSTLGeometry(stlLoader, educationMeshData, "educationMesh", educationMeshTargets);
    loadSTLGeometry(stlLoader, skillsMeshData, "skillsMesh", skillsMeshTargets);
    loadSTLGeometry(stlLoader, portfolioMeshData, "portfolioMesh", portfolioMeshTargets);

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
    controls = new OrbitControls(camera, mountRef.current);
    controls.minDistance = 1000;
    controls.maxDistance = 3000;

    const initialCameraPos = camera.position.clone();
    const initialTarget = controls.target.clone();

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

    const particlesMaterial = new THREE.PointsMaterial({
      color: "white",
      size: 1.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    });
    const pointCloud = new THREE.Points(particles, particlesMaterial);
    
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

    const sphereWork = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(workIcon), color: "skyblue" }));
    const sphereEducation = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(educationIcon), color: "skyblue" }));
    const sphereSkills = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(skillsIcon), color: "skyblue" }));
    const spherePortfolio = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(portfolioIcon), color: "skyblue" }));
    sphereWork.sectionId = SECTIONS.WORK;
    sphereEducation.sectionId = SECTIONS.EDUCATION;
    sphereSkills.sectionId = SECTIONS.SKILLS;
    spherePortfolio.sectionId = SECTIONS.PORTFOLIO;

    sphereWork.position.set(-SPHERE_ORBITING_RADIUS, SPHERE_Y_LEVELS, 0);
    sphereEducation.position.set(0, SPHERE_Y_LEVELS, -SPHERE_ORBITING_RADIUS);
    sphereSkills.position.set(SPHERE_ORBITING_RADIUS, SPHERE_Y_LEVELS, 0);
    spherePortfolio.position.set(0, SPHERE_Y_LEVELS, SPHERE_ORBITING_RADIUS);

    rotatingGroup.add(sphereWork);
    rotatingGroup.add(sphereEducation);
    rotatingGroup.add(sphereSkills);
    rotatingGroup.add(spherePortfolio);

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

    const showPanel = (duration = 1.0) => {
      tl.clear();
      gsap.to(mainDomObject.children[0].element.style, { opacity: 0, duration: 1/5 * duration, ease: "power2.out" });
      gsap.to(mainDomObject.children[1].element.style, { opacity: 0, duration: 1/5 * duration, ease: "power2.out" });

      // LINES
      const linesDrawData = { count: 0 };
      tl.to(linesDrawData, { count: panelLinesGeometry.attributes.position.count, duration: 2/5 * duration, ease: "power2.out", onUpdate: () => { panelLinesGeometry.setDrawRange(0, linesDrawData.count); } });
    
      // PANEL
      const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -SPHERE_Y_LEVELS / 1.5 - 900);
      panelMaterial.clippingPlanes = [clipPlane];
      panelMaterial.clipShadows = true;
      panelMaterial.transparent = true;
      renderer.localClippingEnabled = true;
      tl.to(clipPlane, { constant: -SPHERE_Y_LEVELS / 1.5 + 900, duration: 1/5 * duration, ease: "power2.out" });
    
      tl.to(panelDomObject.children[0].element.style, { opacity: 1, duration: 1/5 * duration, ease: "power2.out" });
      tl.to(panelDomObject.children[1].element.style, { opacity: 1, duration: 0, ease: "power2.out" });
    };

    const hidePanel = (duration = 1.0) => {
      tl.clear();

      gsap.to(panelDomObject.children[0].element.style, { opacity: 0, duration: 1/10 * duration, ease: "power2.out" });
      gsap.to(panelDomObject.children[1].element.style, { opacity: 0, duration: 1/10 * duration, ease: "power2.out" });

      // PANEL
      const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -SPHERE_Y_LEVELS / 1.5 + 900);
      panelMaterial.clippingPlanes = [clipPlane];
      panelMaterial.clipShadows = true;
      panelMaterial.transparent = true;
      renderer.localClippingEnabled = true;
      tl.to(clipPlane, { constant: -SPHERE_Y_LEVELS / 1.5 - 900, duration: 1/5 * duration, ease: "power2.out" });

      // LINES
      const linesDrawData = { count: panelLinesGeometry.attributes.position.count };
      tl.to(linesDrawData, { count: 0, duration: 2/5 * duration, ease: "power2.out", onUpdate: () => { panelLinesGeometry.setDrawRange(0, linesDrawData.count); } });
      
      tl.to(mainDomObject.children[0].element.style, { opacity: 1, duration: 1/5 * duration, ease: "power2.out" });
      tl.to(mainDomObject.children[1].element.style, { opacity: 1, duration: 0, ease: "power2.out" });
    };

    const onMouseMove = (event) => {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      rayCaster.setFromCamera(mouse, camera);

      const intersects = rayCaster.intersectObjects([sphereWork, sphereEducation, sphereSkills, spherePortfolio], true);
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const hoveredMesh = intersects[0].object;
        if(hoveredMesh.sectionId == hoveredSectionRef.current)
          return;
        setHoveredSection(hoveredMesh.sectionId);
        gsap.to(hoveredMesh.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
        gsap.to(hoveredMesh.material.color, { ...new THREE.Color('white'), duration: 0.5 });
        showPanel();
      } else if(hoveredSectionRef.current != null) {
        document.body.style.cursor = 'default';
        const hoveredMesh = scene.getObjectByProperty("sectionId", hoveredSectionRef.current);
        setHoveredSection();
        gsap.to(hoveredMesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(hoveredMesh.material.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
        hidePanel();
      }
    };

    const onMouseDown = () => {
      window.addEventListener('mouseup', onMouseUp, false);

      // For telling if the user is dragging or clicking
      setTimeout(() => { window.removeEventListener('mouseup', onMouseUp); }, 200);
    };
    const onMouseUp = (event) => {
      event.preventDefault();
      
      setHoveredSection();
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      rayCaster.setFromCamera(mouse, camera);

      const intersects = rayCaster.intersectObjects([sphereWork, sphereEducation, sphereSkills, spherePortfolio], true);
      const oldMesh = scene.getObjectByProperty("sectionId", selectedSectionRef.current);
      if (selectedSectionRef.current == null && intersects.length > 0) {
        document.body.style.cursor = 'default';
        window.removeEventListener("mousemove", onMouseMove);
        const selectedMesh = intersects[0].object;
        if(selectedMesh.sectionId != selectedSectionRef.current) {
          gsap.to(oldMesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
          gsap.to(oldMesh.material?.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
          gsap.to(selectedMesh.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: "power2.out" });
          gsap.to(selectedMesh.material?.color, { ...new THREE.Color('white'), duration: 0.5 });
          if(selectedMesh.sectionId != hoveredSectionRef.current)
            showPanel();
          setSelectedSection(selectedMesh.sectionId);
        }
      } else if(selectedSectionRef.current != null) {
        window.addEventListener("mousemove", onMouseMove);
        gsap.to(oldMesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(oldMesh.material?.color, { ...new THREE.Color("skyblue"), duration: 0.5 });
        setSelectedSection();
        hidePanel();
      }
    };

    const onWindowResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      cssRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      composer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    const resetView = () => {
      if(camera.position.equals(initialCameraPos))
        return;

      // Reset camera position
      gsap.to(camera.position, {
        x: initialCameraPos.x,
        y: initialCameraPos.y,
        z: initialCameraPos.z,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // Reset orbit controls target
      const tempTarget = controls.target.clone();

      gsap.to(tempTarget, {
        x: initialTarget.x,
        y: initialTarget.y,
        z: initialTarget.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          controls.target.copy(tempTarget);
          controls.update();
        }
      });
    };

    // EVENTS
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('resize', onWindowResize, false);
    document.getElementById("reset-view-button").addEventListener('mousedown', resetView);
    $(".lang-button").on('mousedown', handleLanguageToggle);

    const collapsePointCloud = (target, lerpFactor = 0.05) => {
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        // Direction vector = target - current
        const dx = target[ix] - particlePositions[ix];
        const dy = target[iy] - particlePositions[iy];
        const dz = target[iz] - particlePositions[iz];

        // Move current position toward target
        particlePositions[ix] += dx * lerpFactor;
        particlePositions[iy] += dy * lerpFactor;
        particlePositions[iz] += dz * lerpFactor;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      var vertexpos = 0;
      var colorpos = 0;
      var numConnected = 0;

      for (let i = 0; i < particleCount; i++)
        particlesData[i].numConnections = 0;

      const workMesh = scene.getObjectByName("workMesh");
      const educationMesh = scene.getObjectByName("educationMesh");
      const skillsMesh = scene.getObjectByName("skillsMesh");
      const portfolioMesh = scene.getObjectByName("portfolioMesh");
      if(selectedSectionRef.current == SECTIONS.WORK) {
        collapsePointCloud(workMeshTargets);
        educationMesh.material.opacity = 0;
        skillsMesh.material.opacity = 0;
        portfolioMesh.material.opacity = 0;
        gsap.to(linesMesh.material, { opacity: 0, duration: 5, ease: "power2.out" });
        gsap.to(workMesh.material, { opacity: 0.01, duration: 2, ease: "power2.out" });
      }
      else if(selectedSectionRef.current == SECTIONS.EDUCATION) {
        collapsePointCloud(educationMeshTargets);
        workMesh.material.opacity = 0;
        skillsMesh.material.opacity = 0;
        portfolioMesh.material.opacity = 0;
        gsap.to(linesMesh.material, { opacity: 0, duration: 5, ease: "power2.out" });
        gsap.to(educationMesh.material, { opacity: 0.01, duration: 2, ease: "power2.out" });
      }
      else if(selectedSectionRef.current == SECTIONS.SKILLS) {
        collapsePointCloud(skillsMeshTargets);
        workMesh.material.opacity = 0;
        educationMesh.material.opacity = 0;
        portfolioMesh.material.opacity = 0;
        gsap.to(linesMesh.material, { opacity: 0, duration: 5, ease: "power2.out" });
        gsap.to(skillsMesh.material, { opacity: 0.01, duration: 2, ease: "power2.out" });
      }
      else if(selectedSectionRef.current == SECTIONS.PORTFOLIO) {
        collapsePointCloud(portfolioMeshTargets);
        workMesh.material.opacity = 0;
        educationMesh.material.opacity = 0;
        skillsMesh.material.opacity = 0;
        gsap.to(linesMesh.material, { opacity: 0, duration: 5, ease: "power2.out" });
        gsap.to(portfolioMesh.material, { opacity: 0.01, duration: 2, ease: "power2.out" });
      }
      else {
        gsap.to(linesMesh.material, { opacity: 1, duration: 5, ease: "power2.out" });

        if(workMesh) workMesh.material.opacity = 0;
        if(educationMesh) educationMesh.material.opacity = 0;
        if(skillsMesh) skillsMesh.material.opacity = 0;
        if(portfolioMesh) portfolioMesh.material.opacity = 0;
      }

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

      const pos = new THREE.Vector3(0, SPHERE_Y_LEVELS, 0);
      if(hoveredSectionRef.current != null) {
        const hoveredMesh = scene.getObjectByProperty("sectionId", hoveredSectionRef.current);
        hoveredMesh.getWorldPosition(pos);
      }
      panelLines.geometry.attributes.position.setXYZ(0, pos.x, pos.y, pos.z);
      panelLines.geometry.attributes.position.needsUpdate = true;

      sphereWork.lookAt(camera.position);
      sphereEducation.lookAt(camera.position);
      sphereSkills.lookAt(camera.position);
      spherePortfolio.lookAt(camera.position);

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
      composer.render();
    };

    hidePanel(0);
    animate();

    // Reset controls when opening new tab
    // document.querySelectorAll('a').forEach(link => {
    //   link.addEventListener('mousedown', () => { controls.reset(); });
    // });

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!i18n.isInitialized)
      return;
    
    $("#loader").css("opacity", 0);
    $("#loader").css("z-index", 0);
  }, [i18n.isInitialized, t]);
  
  const resetControls = () => {
    controls.reset();
  };

  const handleLanguageToggle = (event) => {
    // $(".switch .switch-handle").css("left", event.target.id == "lang-en" ? "50%" : "0%");
    i18n.changeLanguage(event.target.id == "lang-en" ? "en" : "fr");
  };

  const handleToggleShowPdfModal = () => {
    console.log(showPdfModal);
    setShowPdfModal(!showPdfModal);
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
            <MainPanel resetControls = { resetControls } />
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
              top: 142.5,  // TODO: Magic value
              zIndex: (hoveredSection != null) || (selectedSection != null) ? 1 : 0,
            }}
          >
            { (hoveredSection == SECTIONS.WORK) || (selectedSection == SECTIONS.WORK) ? <WorkPanel resetControls = { resetControls } /> : null }
            { (hoveredSection == SECTIONS.EDUCATION) || (selectedSection == SECTIONS.EDUCATION) ? <EducationPanel resetControls = { resetControls } /> : null }
            { (hoveredSection == SECTIONS.SKILLS) || (selectedSection == SECTIONS.SKILLS) ? <SkillsPanel resetControls = { resetControls } /> : null }
            { (hoveredSection == SECTIONS.PORTFOLIO) || (selectedSection == SECTIONS.PORTFOLIO) ? <PortfolioPanel resetControls = { resetControls } /> : null }
          </div>
        </>;
      })
    }
    <div className = 'w-100 h-100' ref = { mountRef }>
      <div id = "loader" className = 'position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
        <div className = "loader-item"></div>
      </div>
      <div className = 'position-absolute top-0 bottom-0 start-0 end-0'>
        <div className = "fixed-bottom d-flex justify-content-center align-items-center text-center">
          <div className = 'row container'>
            <div className = 'col-4 d-flex justify-content-center align-items-center'>
              <button
                type = "button"
                id = "reset-view-button"
                className = 'btn btn-sm btn-outline-light border-0'
                style = {{ zIndex: 1 }}
              >
                <i className = "bi bi-arrow-counterclockwise align-middle me-1"></i>
                { t("Index/IndexApp:reset-view-label") }
              </button>
            </div>
            <div className = "col-4 d-flex justify-content-center align-items-center">
              <div className = "switch rounded overflow-hidden position-relative border borrder-1 border-light" style = {{ zIndex: 1 }}>
                <span
                  className = "switch-handle position-absolute w-50 h-100 bg-light p-0"
                  style = {{ left: i18n.language == "en" ? "50%" : "0%" }}
                >
                </span>
                <div className = 'position-absolute w-100 h-100'>
                  <button
                    type = "button"
                    className = 'lang-button border-0 w-50 h-100 p-0'
                    id = "lang-fr"
                  >
                    <img className = "align-baseline h-100" src = { frIcon } style = {{ pointerEvents: "none" }} alt = "Français" title = "Français" />
                  </button>
                  <button
                    type = "button"
                    className = "lang-button border-0 w-50 h-100 p-0"
                    id = "lang-en"
                  >
                    <img className = "align-baseline h-100" src = { enIcon } style = {{ pointerEvents: "none" }} alt = "English" title = "English" />
                  </button>
                </div>
              </div>
            </div>
            <div className = 'col-4 d-flex justify-content-center align-items-center'>
              <button
                type = "button"
                id = "pdf-version-button"
                className = 'btn btn-sm btn-outline-light border-0'
                style = {{ zIndex: 1 }}
                onMouseDown = { handleToggleShowPdfModal }
              >
                <i className = "bi bi-filetype-pdf align-middle me-1"></i>
                { t("Index/IndexApp:view-pdf-version-label") }
              </button>
            </div>
            <Modal show = { showPdfModal } onHide = { handleToggleShowPdfModal } centered>
                <Modal.Header className = 'text-light' data-bs-theme = "dark">
                    { t("Index/IndexApp:pdf-modal-title") }
                    <button
                        type = "button"
                        className = "btn-close btn-close-white"
                        aria-label = "Close"
                        onClick = { handleToggleShowPdfModal }
                    >
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className = "list-group border-0">
                      <a href = { `${window.location.href}pdf/` } className = "list-group-item list-group-item-action" target = 'blank'>{ t("Index/IndexApp:full-stack-software-engineer") }<i className = "bi bi-box-arrow-up-right ms-2"></i></a>
                    </div>
                </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default IndexApp;