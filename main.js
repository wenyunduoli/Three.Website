// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AmbientLight } from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// const loader = new THREE.ObjectLoader();

// const loader = new OBJLoader();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

window.addEventListener('resize', function()
     {
       var width = window.innerWidth;
       var height = window.innerHeight;
       renderer.setSize(width, height);
       camera.aspect = width / height;
       camera.updateProjectionMatrix();
     });

// function toruses(){
//   const geometry = new THREE.TorusGeometry(2, 1, 16, 100);
//   const material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: true});
//   const torus = new THREE.Mesh(geometry, material);
//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(80));
  
//   torus.position.set(x, y, z);
//   scene.add(torus);


// }

// Array(50).fill().forEach(toruses);

function toruses(){
  const geometry = new THREE.TorusGeometry(2, 1, 16, 100);
  const material = new THREE.MeshStandardMaterial({color: 0x000000, wireframe: true});
  const torus = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(120));
  
  torus.position.set(x, y, z);
  
  // Add a rotation animation to the torus
  torus.rotation.set(
    THREE.MathUtils.randFloat(0, Math.PI),
    THREE.MathUtils.randFloat(0, Math.PI),
    THREE.MathUtils.randFloat(0, Math.PI)
  );
  const speed = THREE.MathUtils.randFloat(0.01, 0.05);
  const axis = new THREE.Vector3(
    THREE.MathUtils.randFloat(-1, 1),
    THREE.MathUtils.randFloat(-1, 1),
    THREE.MathUtils.randFloat(-1, 1)
  ).normalize();
  function animate() {
    torus.rotateOnAxis(axis, 0.2);
    requestAnimationFrame(animate);
  }
  animate();
  
  scene.add(torus);
}

Array(100).fill().forEach(toruses);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const geometry2 = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const material2 = new THREE.MeshToonMaterial( { color: 0xffff00 } ); 
const torusKnot = new THREE.Mesh( geometry2, material2 ); scene.add( torusKnot );
torus.add(torusKnot);

torusKnot.position.x = 30

const geometry3 = new THREE.TorusKnotGeometry( 50, 2, 300, 9, 1, 7 ); 
const material3 = new THREE.MeshNormalMaterial( { color: 0xff0000 } ); 
const torusKnot2 = new THREE.Mesh( geometry3, material3 ); scene.add( torusKnot2 );
torus.add(torusKnot2);
torusKnot2.position.x = -40
// torusKnot2.position.y = 30




const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);
scene.add(pointLight);

const controls = new OrbitControls( camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0x5b00ff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();

window.addEventListener('mousemove', function(e){
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, intersectionPoint); 
})

window.addEventListener("click", function (e) {
  const sphereGeo = new THREE.SphereGeometry(0.6, 30, 30);
  const sphereMat = new THREE.MeshMatcapMaterial({
    color: 0x76a5af,
    metalness: 0,
    roughness: 0
    })
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphereMesh);
  sphereMesh.position.copy(intersectionPoint);
})




const spaceTexture = new THREE.TextureLoader().load('sky03.png');
scene.background = spaceTexture;

const circle = new THREE.TextureLoader().load('yayaya.png');

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: circle,
  })
);

scene.add(ball);

ball.position.z = 20;
ball.position.setX(-5);

// scene.add(pointLight);

// loader.load('assets/build.obj');

// const loader = new GLTFLoader();

// loader.load( 'assets/build.obj', function ( obj ) {
//   console.log(obj);
// 	scene.add( obj.scene );
//   const root = obj.scene;
//   root.scale.set(10,10,10);

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

// const light = new THREE.DirectionalLight(0xffffff, 2);
// light.position.set(2,2,5);
// scene.add(light);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top

  ball.rotation.x += 0.05;
  ball.rotation.y += 0.075;
  ball.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  
  renderer.render(scene,camera);
}

animate();