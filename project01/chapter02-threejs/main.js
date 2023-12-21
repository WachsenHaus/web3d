import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const renderer = new THREE.WebGLRenderer({
  antialias: true, //박스 끝부분의 우글우글 현상을 완화해준다.
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
floorMesh.name = 'floor'

// 조명 (태양빛을 생각하자.)
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

// 카메라
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;

// camera.position.y = 5;

scene.add(floorMesh);

scene.add(directionalLight);

const boxgeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff12,
});
const boxMesh = new THREE.Mesh(boxgeometry, boxMaterial);
boxMesh.position.set(0, 0.5, 0);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
// scene.add(boxMesh);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;
// // 최대각도를 못내려가게 해준다.
orbitControls.maxPolarAngle = Math.PI / 2; // 90도
orbitControls.minpolo = Math.PI / 45; // 45도
orbitControls.maxAzimuthAngle = Math.PI / 2; // 45도
orbitControls.minAzimuthAngle = -Math.PI / 2; // 45도

const rayCaster = new THREE.Raycaster();
const newPosition = new THREE.Vector3(0,1,0);

renderer.domElement.addEventListener("pointerdown",(e) => {
  const x = (e.clientX / window.innerWidth) *2 -1
  const y = -((e.clientY / window.innerHeight) * 2 - 1)
  rayCaster.setFromCamera(new THREE.Vector2(x,y),camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  const intersectFloor = intersects.find(i => i.object.name === 'floor');
  newPosition.copy(intersectFloor.point);
  newPosition.y = 1;
  
  console.log(intersectFloor);
});



const gltfLoader = new GLTFLoader();

const gltf = await gltfLoader.loadAsync('/dancer.glb');
console.log(gltf);
const animationClips = gltf.animations;
const character = gltf.scene;
character.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
scene.add(gltf.scene);

const mixer = new THREE.AnimationMixer(character);
const action = mixer.clipAction(animationClips[3]);
action.setLoop(THREE.LoopPingPong);
action.play();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 카메라의 비율을 맞추기 위해
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();

const render = () => {
  character.lookAt(newPosition);
  targetVector.subVectors(newPosition,character.position).normalize().multiplyScalar(0.01)

  if(Math.abs(character.position.x - newPosition.x) >= 1 || Math.abs(character.position.z - newPosition.z) >= 1 ){
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop();
  }
  action.play();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
};
render();

// PerspectiveCamera, OrthographicCamera 두개가 존재한다.
// PerspectiveCamera는 원근감을 가지고, OrthographicCamera는 원근감이 없다.
// PerspectiveCamera의 경우, 카메라의 위치를 조정하여 원근감을 조절할 수 있다.

// 절두체

// 카메라로부터 가까운곳은 near 먼곳은 far라고 불린다.
// 카메라의 화각 fov란 카메라가 보는 화면의 각도를 말한다.
