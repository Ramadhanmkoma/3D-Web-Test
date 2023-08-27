import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "../css/sphere.css";

let scene, camera, geometry, controls, renderer;
let windWidth = window.innerWidth;
let windHeight = window.innerHeight;

const init = () => {
  // Creating a scene
  scene = new THREE.Scene();

  // Create Our Sphere geometry
  geometry = new THREE.SphereGeometry(3, 64, 64);
  // apply a skin
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(79, 240, 250),
  });

  // comnine geometry and material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //lights
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(0, 10, 10);
  scene.add(light);

  // add a camera
  camera = new THREE.PerspectiveCamera(
    45,
    windWidth / windHeight,
    0.1,
    100
  );
  camera.position.z = 20;
  scene.add(camera);

  // renderer
  const canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(windWidth, windHeight);

  //controls
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
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
}

loop();