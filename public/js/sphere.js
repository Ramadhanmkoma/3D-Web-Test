import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../css/sphere.css";
import gsap from "gsap";

let scene, camera, geometry, controls, renderer, mesh;
let windWidth = window.innerWidth;
let windHeight = window.innerHeight;
const audicity = document.createElement("audio");

const init = () => {
  // Creating a scene
  scene = new THREE.Scene();

  // Create Our Sphere geometry
  geometry = new THREE.SphereGeometry(0.78, 64, 64);
  // apply a skin
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(79, 80, 250),
    roughness: 0.25,
  });

  // comnine geometry and material
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //lights
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 10, 10);
  light.intensity = 1.25;
  scene.add(light);

  // add a camera
  camera = new THREE.PerspectiveCamera(45, windWidth / windHeight, 0.1, 100);
  camera.position.z = 20;
  scene.add(camera);

  // renderer
  const canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(windWidth, windHeight);
  renderer.setPixelRatio(2);
  //controls
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;
  //   controls.screenSpacePanning = true;
  //   controls.enablePan = false;
  // controls.enableZoom = false;

  renderer.render(scene, camera);

  onWindowsResize();
};

init();

// when windows resizes
function onWindowsResize() {
  window.addEventListener("resize", () => {
    windWidth = window.innerWidth;
    windHeight = window.innerHeight;
    camera.aspect = windWidth / windHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(windWidth, windHeight);
  });
}

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  //recursive approach
  window.requestAnimationFrame(loop);
};

loop();

// timeline
const timeLine = gsap.timeline({ defaults: { duration: 10 } });
timeLine.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

let mouseDown = false;
let rgb = [];
audicity.setAttribute("src", "../textures/Project_Utopia.mp3");
audicity.setAttribute("loop", "");

window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => {
  mouseDown = false;
  audicity.pause();
});

window.addEventListener("mousemove", function (e) {
  if (mouseDown) {
    rgb = [
      Math.round((e.clientX / windWidth) * 255),
      Math.round((e.clientY / windHeight) * 255),
      180,
    ];
    let avatarColor = new THREE.Color(rgb[0], rgb[1], rgb[2]);
    gsap.to(mesh.material.color, avatarColor);
    audicity.play();
  }
});
