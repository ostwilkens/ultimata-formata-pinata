import * as THREE from './node_modules/three/build/three.module.js'
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { VRButton } from './node_modules/three/examples/jsm/webxr/VRButton.js'

function main() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)

  const scene = new THREE.Scene()

  let mtlLoader = new MTLLoader()
  let objLoader = new OBJLoader()

  //audio
  var listener = new THREE.AudioListener()
  camera.add(listener)
  var sound = new THREE.Audio(listener)
  var audioLoader = new THREE.AudioLoader()
  audioLoader.load('assets/DaSquareBass.wav', function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(true)
    sound.setVolume(0.3)
    // sound.play()
  })

  let time = new THREE.Clock(true)

  mtlLoader.load('/assets/herrstugan/herrstugan1.mtl', (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load('/assets/herrstugan/herrstugan1.obj', (object) => {
      object.rotateX(-Math.PI / 2)
      object.position.x = -2
      scene.add(object)
      time.start()
    })
  })

  var light = new THREE.AmbientLight(0x282828)
  var light2 = new THREE.PointLight(0x857760, 1.8, 55)
  var light3 = new THREE.PointLight(0x607777, 1, 40)
  light2.position.y = 12
  light3.position.y = 10
  light2.position.x = 3
  light3.position.x = -3
  scene.add(light)
  scene.add(light2)
  scene.add(light3)

  function animate() {
    let elapsed = time.getElapsedTime() * (100 / 60)
    let delta = time.getDelta()

    let i = Math.floor(elapsed / 4)

    camera.position.z = 15
    camera.position.y = 10
    camera.position.x = (((elapsed * 0.1) % 2) - 1) * 4 - 8
    // camera.rotation.x = -(((elapsed * 0.1) % 2) - 1) * 0.4 + 2
    // camera.rotation.z = Math.PI / 2
    camera.rotation.y = Math.PI
    // camera.rotation.z = (((elapsed * 0.1) % 2) - 1) * 1
    // camera.fov = elapsed * 360 / 8

    // i = i % 

    // if (i < 4 || i == 6) {
    //   camera.position.x = 0
    //   camera.position.y = 14
    //   camera.position.z = (((elapsed / 32) % 2) - 1) * 20
    //   camera.rotation.x = Math.PI / 2
    //   camera.rotation.y = 0
    //   camera.rotation.z = 0
    //   camera.fov = 75
    // } else if (i == 4 || i == 7) {
    //   camera.position.x = 12
    //   camera.position.y = 9.5
    //   camera.position.z = (((elapsed / 12) % 2) - 1) * 16
    //   camera.rotation.x = 0
    //   camera.rotation.y = -Math.PI / 2
    //   camera.rotation.z = 0
    //   camera.fov = 70
    // } else if (i == 5) {
    //   camera.position.x = 11.5
    //   camera.position.y = 9.5
    //   camera.position.z = 18 - (((elapsed / 12) % 2) - 1) * 18
    //   camera.rotation.x = 0
    //   camera.rotation.y = -Math.PI / 2
    //   camera.rotation.z = 0
    //   camera.fov = 70
    // } else if (i == 8) {
    //   camera.position.x = 18
    //   camera.position.y = 9
    //   camera.position.z = (((elapsed / 12) % 2) - 1) * 18
    //   camera.rotation.x = -(((elapsed / 12) % 2) - 1) * 0.4 + 2
    //   camera.rotation.y = Math.PI / 2
    //   camera.rotation.z = (((elapsed / 12) % 2) - 1) * 1
    //   camera.fov = 55
    // } else {
    //   camera.position.x = 18
    //   camera.position.y = 9
    //   camera.position.z = -(((elapsed / 12) % 2) - 1) * 18
    //   camera.rotation.x = -(((elapsed / 12) % 2) - 1) * 0.4 + 2
    //   camera.rotation.y = Math.PI / 2
    //   camera.rotation.z = (((elapsed / 12) % 2) - 1) * 1
    //   camera.fov = 55
    // }

    // camera.fov = 60 + elapsed

    // camera.fov += Math.max(0, (elapsed % 1) - 0.8) * 10
    camera.updateProjectionMatrix()

    light2.position.z = (((elapsed * 0.25) % 2) - 1) * 70
    light3.position.z = ((((elapsed + 4) * 0.25) % 2) - 1) * 70

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

main()
75
