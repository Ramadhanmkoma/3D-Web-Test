import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import * as dat from 'dat.gui';
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

// Debugging
const gui = new dat.GUI();

let scene, camera, renderer, cube, sphereCamera;
const windWidth = window.innerWidth;
const windHeight = window.innerHeight;
const audicity = document.createElement("audio");
let isPaused = false;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, windWidth / windHeight, 0.1, 1000);
  //place camera away from the center
  camera.position.set(0, 400, 1000);

  audicity.setAttribute("src", "textures/Project_Utopia.mp3");
  audicity.setAttribute("loop", "");
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(windWidth, windHeight);
  document.body.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", renderer);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

  let pointerLock = new PointerLockControls(camera, renderer.domElement);
  pointerLock.addEventListener("change", renderer);
  pointerLock.isLocked = true;

  let urls = [
    "sun11s.png",
    "sun12s.png",
    "sun13s.png",
    "sun14s.png",
    "sun15s.png",
    "sun16s.png",
  ];
  let loader = new THREE.CubeTextureLoader();
  scene.background = loader.load(urls);

  render();
  audicity.play();
}

function render() {
  renderer.render(scene, camera);
  // sphereCamera.update(renderer, scene);
  requestAnimationFrame(render);
}

// window.addEventListener("resize", () => {
//   windWidth = window.innerWidth;
//   windHeight = window.innerHeight;
//   camera.aspect = windWidth / windHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(windWidth, windHeight);
// });

init();

const pp = window.document.getElementById("pause");

pp.addEventListener("click", function () {
  if (isPaused) {
    document.getElementById("p-icon").innerHTML = `II`;
    pp.setAttribute('title', 'pause');
    audicity.play();
    isPaused = false;
  } else {
    document.getElementById("p-icon").innerHTML = `&looparrowright;`;
    pp.setAttribute('title', 'play');
    audicity.pause();
    isPaused = true;
  }
});

pp.addEventListener("mouseover", function () {
  pp.style.cssText = `
    background-color: #39f;
    position: fixed;
        padding: 1em;
        box-sizing: border-box;
        inset: auto auto 1em 1em;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: grid;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: .3s ease-in;
  `;
});

pp.addEventListener("mouseout", function () {
  pp.style.cssText = `
    background-color: #0008;
    position: fixed;
        padding: 1em;
        box-sizing: border-box;
        inset: auto auto 1em 1em;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: grid;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: .3s ease-in;
  `;
});

