import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas & Scene
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Camera
const sizes = { width: window.innerWidth, height: window.innerHeight }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 1, 2)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.3))
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5)
scene.add(pointLight)

// Texture Loader
const textureLoader = new THREE.TextureLoader()

const applyTextureFilter = (texture) => {
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  return texture
}

const earthColor = applyTextureFilter(textureLoader.load('https://github.com/ClideHiraji/Jagape-ITE18-Act1.9/blob/main/static/textures/earth/earthmap1k.jpg'))
const earthBump = applyTextureFilter(textureLoader.load('https://github.com/ClideHiraji/Jagape-ITE18-Act1.9/blob/main/static/textures/earth/earthbump1k.jpg
const earthSpec = applyTextureFilter(textureLoader.load('https://github.com/ClideHiraji/Jagape-ITE18-Act1.9/blob/main/static/textures/earth/earthspec1k.jpg'))
const earthLights = applyTextureFilter(textureLoader.load('Jhttps://github.com/ClideHiraji/Jagape-ITE18-Act1.9/blob/main/static/textures/earth/earthlights1k.jpg'))
const earthClouds = applyTextureFilter(textureLoader.load('https://github.com/ClideHiraji/Jagape-ITE18-Act1.9/blob/main/static/textures/earth/earthcloudmaptrans.jpg'))

// Earth Material (bump + specular)
const earthMaterial = new THREE.MeshPhongMaterial({
  map: earthColor,
  bumpMap: earthBump,
  bumpScale: 0.05,
  specularMap: earthSpec,
  specular: new THREE.Color(0x222222),
  shininess: 15
})

// Earth Mesh
const earthGeometry = new THREE.SphereGeometry(1, 64, 64)
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
scene.add(earthMesh)

// Night lights
const nightMaterial = new THREE.MeshBasicMaterial({
  map: earthLights,
  blending: THREE.AdditiveBlending,
  transparent: true
})
const nightMesh = new THREE.Mesh(earthGeometry, nightMaterial)
scene.add(nightMesh)

// Clouds
const cloudMaterial = new THREE.MeshLambertMaterial({
  map: earthClouds,
  transparent: true,
  opacity: 0.4
})
const cloudMesh = new THREE.Mesh(earthGeometry, cloudMaterial)
cloudMesh.scale.set(1.01, 1.01, 1.01)
scene.add(cloudMesh)

// Resize Handling
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animation Loop
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  earthMesh.rotation.y = elapsedTime * 0.1
  cloudMesh.rotation.y = elapsedTime * 0.08
  nightMesh.rotation.y = elapsedTime * 0.1

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()
