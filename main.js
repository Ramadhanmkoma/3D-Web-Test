import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, cube, sphereCamera;
const windWidth = window.innerWidth;
const windHeight = window.innerHeight;
const audicity = document.createElement("audio");
let isPaused = false;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, windWidth / windHeight, 1, 5000);
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

  // creating a sphere camera
  sphereCamera = new THREE.CubeCamera(1, 1000, 500);
  // apply sphere camera at the same position as the sphere
  sphereCamera.position.set(0, 100, 0);
  // add sphere camera to the scene
  scene.add(sphereCamera);
  // creating a sphere geometry and sphere material
  let sphereMaterial = new THREE.MeshBasicMaterial({
    // envMap: sphereCamera.renderTarget
  });
  let sphereGeometry = new THREE.SphereGeometry(350, 50, 50);
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 100, 0);
  // scene.add(sphere);

  //light
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 10, 10);
  scene.add(light);

  render();
  audicity.play();
}

function render() {
  renderer.render(scene, camera);
  // sphereCamera.update(renderer,scene);
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
    audicity.play();
    isPaused = false;
  } else {
    document.getElementById("p-icon").innerHTML = `&looparrowright;`;
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
