await loadScript("https://unpkg.com/three@0.109.0/build/three.min.js")
scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffff00, 20);
pointLight.position.set(2, 2, 4);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xffffff, 20);
pointLight2.position.set(8, 2, 2);
scene.add(pointLight2);
geometry = new THREE.SphereGeometry(0.7, 4, 32);
material = new THREE.MeshStandardMaterial({color: "#8338ec"})
cube = new THREE.Mesh(geometry, material);
scene.add(cube)
camera.position.z = 1.5
update = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}
s0.init({ src: renderer.domElement })
src(s0).repeat().out()
