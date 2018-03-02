const THREE = require('THREE')
const envMapify = require('../lib')(THREE)
require('./OrbitControls')(THREE)

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({antialias: true})
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
document.body.appendChild(renderer.domElement)
document.body.style.margin = 0
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(0, 0, 10)
new THREE.OrbitControls(camera)
scene.add(new THREE.Mesh(
	new THREE.TorusKnotBufferGeometry(2, .8, 100, 16),
	new THREE.MeshStandardMaterial()
))
scene.add(new THREE.AmbientLight)
envMapify(scene, renderer, '/assets/') // Pass the /assets prefix so it doesn't try to look up the assets in node_modules.  Omit this when you include this library
function render() {
	requestAnimationFrame(render)
	renderer.render(scene, camera)
}
render()