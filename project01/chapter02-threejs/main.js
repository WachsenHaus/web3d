import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

// 카메라가 필요한 파라미터들은 ?
// asepec는 카메라의 비율을 말한다.
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 'gray' });
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.receiveShadow = true;
floorMesh.castShadow = true;
floorMesh.rotation.x = -Math.PI / 2;

// 조명 (태양빛을 생각하자.)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
// directionalLight.position.set(3, 4, -5);
directionalLight.lookAt(0, 0, 0);

// 카메라
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;

// camera.position.y = 5;

scene.add(floorMesh);
scene.add(directionalLight);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 'green',
  side: THREE.FrontSide,
});

const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 'red',
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.51, 4);
// backSideMesh.castShadow = true;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 'blue',
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(-2, 0.51, 4);
// doubleSideMesh.castShadow = true;
doubleSideMesh.receiveShadow = true;
scene.add(doubleSideMesh);

const torusGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 'purple' });
torusMaterial.roughness = 0.5;
torusMaterial.metalness = 1;
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);

torusMesh.position.set(-4, 1, 0);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 'purple',
});
torusKnotLambertMaterial.emissive = new THREE.Color('0x0000ff');
torusKnotLambertMaterial.emissiveIntensity = 0.2;
const torusKnotLambertMesh = new THREE.Mesh(
  torusGeometry,
  torusKnotLambertMaterial
);
torusKnotLambertMesh.position.set(-2, 1, 0);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
scene.add(torusKnotLambertMesh);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({
  color: 'purple',
});
torusKnotPhongMaterial.emissive = new THREE.Color('0x0000ff');
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color('0x00ff00');
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(
  torusGeometry,
  torusKnotPhongMaterial
);
torusKnotPhongMesh.position.set(0, 1, 0);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
scene.add(torusKnotPhongMesh);
const torushKnotBasicMaterial = new THREE.MeshBasicMaterial({
  color: 'purple',
});
const torusKnotBasicMesh = new THREE.Mesh(
  torusGeometry,
  torushKnotBasicMaterial
);
torusKnotBasicMesh.position.set(2, 1, 0);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
scene.add(torusKnotBasicMesh);
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({
  color: 'purple',
});
const torusKnotDepthMesh = new THREE.Mesh(
  torusGeometry,
  torusKnotDepthMaterial
);
torusKnotDepthMesh.position.set(4, 1, 0);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load('/threejs.webp', (texture) => {
//   console.log(texture);
//   const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const textureBoxMaterial = new THREE.MeshStandardMaterial({
//     map: texture,
//   });
//   const textureBoxMesh = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial);
//   textureBoxMesh.position.set(-4, 1, 0);
//   textureBoxMesh.castShadow = true;
//   textureBoxMesh.receiveShadow = true;
//   scene.add(textureBoxMesh);
// });

const texture = await textureLoader.loadAsync('/threejs.webp');
console.log(texture);
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureBoxMaterial = new THREE.MeshStandardMaterial({
  map: texture,
});
const textureBoxMesh = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial);
textureBoxMesh.position.set(-4, 1, 0);
textureBoxMesh.castShadow = true;
textureBoxMesh.receiveShadow = true;
scene.add(textureBoxMesh);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //박스 끝부분의 우글우글 현상을 완화해준다.
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 카메라의 비율을 맞추기 위해
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  textureBoxMesh.rotation.y += 0.01;
};
render();

// PerspectiveCamera, OrthographicCamera 두개가 존재한다.
// PerspectiveCamera는 원근감을 가지고, OrthographicCamera는 원근감이 없다.
// PerspectiveCamera의 경우, 카메라의 위치를 조정하여 원근감을 조절할 수 있다.

// 절두체

// 카메라로부터 가까운곳은 near 먼곳은 far라고 불린다.
// 카메라의 화각 fov란 카메라가 보는 화면의 각도를 말한다.
