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
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 'gray',
  // side: THREE.DoubleSide,
});
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
// scene.add(directionalLight);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionLight.position.set(3, 3, 0);
directionLight.castShadow = true;
directionLight.lookAt(0, 0, 0);
// scene.add(directionLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionLight,
  1
);
// scene.add(directionalLightHelper);

const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
hemisphereLight.position.set(0, 1, 0);
hemisphereLight.lookAt(0, 0, 0);
// scene.add(hemisphereLight);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  1
);
// scene.add(hemisphereLightHelper);

const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
pointLight.castShadow = true;
pointLight.position.set(1, 1, 1);
// scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
rectAreaLight.position.set(0, 1, 2);
// scene.add(rectAreaLight);

const targetObj = new THREE.Object3D();
targetObj.position.set(1, 0, 2);
scene.add(targetObj);

const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 3, 0);
spotLight.target = targetObj;
// spotLight.target.position.set(1, 0, 2);
scene.add(spotLight);

const spoptLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spoptLightHelper);

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
  // textureBoxMesh.rotation.y += 0.01;
};
render();

// PerspectiveCamera, OrthographicCamera 두개가 존재한다.
// PerspectiveCamera는 원근감을 가지고, OrthographicCamera는 원근감이 없다.
// PerspectiveCamera의 경우, 카메라의 위치를 조정하여 원근감을 조절할 수 있다.

// 절두체

// 카메라로부터 가까운곳은 near 먼곳은 far라고 불린다.
// 카메라의 화각 fov란 카메라가 보는 화면의 각도를 말한다.
