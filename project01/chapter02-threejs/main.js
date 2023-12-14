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

const geometry = new THREE.BoxGeometry(1, 1, 1);
// 메쉬스탠다드는 빛의 영향을 받는다.
const material = new THREE.MeshStandardMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.position.y = 0.5;
scene.add(mesh);

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
camera.position.y = 1;

// camera.position.y = 5;

scene.add(floorMesh);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  antialias: true, //박스 끝부분의 우글우글 현상을 완화해준다.
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 'yellow' });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 1.75, 0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI / 2);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 'purple' });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 1, 3);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

const starShpae = new THREE.Shape();
starShpae.moveTo(0, 1);
starShpae.lineTo(0.2, 0.2);
starShpae.lineTo(1, 0.2);
starShpae.lineTo(0.4, -0.1);
starShpae.lineTo(0.6, -1);
starShpae.lineTo(0, -0.5);
starShpae.lineTo(-0.6, -1);
starShpae.lineTo(-0.4, -0.1);
starShpae.lineTo(-1, 0.2);
starShpae.lineTo(-0.2, 0.2);
starShpae.lineTo(0, 1);

const shapeGeometry = new THREE.ShapeGeometry(starShpae);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(0, 1, 2);
shapeMesh.castShadow = true;
shapeMesh.receiveShadow = true;
scene.add(shapeMesh);

const extrudeSettings = {
  steps: 1,
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.3,
  bevelOffset: 0,
  bevelSegments: 100,
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShpae, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 'pink' });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(2, 1.3, 2);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 'orange' });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 1, -3);
sphereMesh.castShadow = true;
sphereMesh.receiveShadow = true;
scene.add(sphereMesh);

const numPoints = 1000;
const positions = new Float32Array(numPoints * 3);

for (let i = 0; i < numPoints; i++) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);
const bufferMaterial = new THREE.PointsMaterial({ color: 'red', size: 0.05 });
const point = new THREE.Points(sphereGeometry, bufferMaterial);
point.position.set(0, 0, -5);
scene.add(point);

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
};
render();

// PerspectiveCamera, OrthographicCamera 두개가 존재한다.
// PerspectiveCamera는 원근감을 가지고, OrthographicCamera는 원근감이 없다.
// PerspectiveCamera의 경우, 카메라의 위치를 조정하여 원근감을 조절할 수 있다.

// 절두체

// 카메라로부터 가까운곳은 near 먼곳은 far라고 불린다.
// 카메라의 화각 fov란 카메라가 보는 화면의 각도를 말한다.
