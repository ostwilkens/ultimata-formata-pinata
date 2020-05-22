import * as THREE from './node_modules/three/build/three.module.js'
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { VRButton } from './node_modules/three/examples/jsm/webxr/VRButton.js'

function fuck() {
  const startButton = document.querySelector('#s')
  startButton.remove()
  fuck2()
}

function main() {
  const startButton = document.querySelector('#s')
  startButton.addEventListener("click", fuck)
  return

  // const startButton = document.querySelector('#s')
  // startButton.remove()
  // fuck2()
}

function fuck2() {
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
  audioLoader.load('assets/DaSquareBass_long.wav', function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(true)
    sound.setVolume(1)
    sound.play()
  })

  let time = new THREE.Clock(true)

  mtlLoader.load('assets/herrstugan/herrstugan1.mtl', (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load('assets/herrstugan/herrstugan1.obj', (object) => {
      object.rotateX(-Math.PI / 2)
      object.position.x = -2
      scene.add(object)
      time.start()
    })
  })

  var light = new THREE.AmbientLight(0x383838)
  var light2 = new THREE.PointLight(0x857760, 1.8, 60)
  var light3 = new THREE.PointLight(0x607777, 1, 45)
  light2.position.y = 12
  light3.position.y = 10
  light2.position.x = 5
  light3.position.x = -5
  scene.add(light)
  scene.add(light2)
  scene.add(light3)

  function animate() {
    let elapsed = time.getElapsedTime() * (100 / 60) * 2
    let delta = time.getDelta()

    elapsed = elapsed % (328 + 60)

    elapsed -= 12

    let i = Math.floor(elapsed / 4)

    // i += 24
    // i += 60

    if (i < 6) {
      camera.position.x = -(((elapsed * 0.1)) - 1) * 4 - 8
      camera.position.y = 12.5 - elapsed * 0.05
      camera.position.z = 18
      camera.rotation.x = -elapsed * 0.01
      camera.rotation.y = Math.PI - elapsed * 0.02
      camera.rotation.z = 0
      camera.fov = 65 - elapsed
    } else if (i < 12) {
      camera.position.x = 12
      camera.position.y = 9.5
      camera.position.z = (((elapsed / 12) % 2) - 1) * 11
      camera.rotation.x = 0
      camera.rotation.y = -Math.PI / 2 + 1
      camera.rotation.z = 0
      camera.fov = 70
    } else if (i < 24) {
      camera.position.x = -12
      camera.position.y = 13
      camera.position.z = (((elapsed / 24) % 2) - 1) * 18
      camera.rotation.x = 0
      camera.rotation.y = Math.PI / 2
      camera.rotation.z = 0
      camera.fov = 40
    } else if (i < 28) {
      camera.position.x = 12
      camera.position.y = 13
      camera.position.z = (((elapsed / 24) % 2) - 1) * 15 + 8
      camera.rotation.x = 0
      camera.rotation.y = -Math.PI / 2
      camera.rotation.z = 0
      camera.fov = 40
    } else if (i < 40) {
      camera.position.x = 11
      camera.position.y = 9.5
      camera.position.z = ((((elapsed - 16) / 24) % 2) - 1) * 17
      camera.rotation.x = Math.PI / 2
      camera.rotation.y = -0.3
      camera.rotation.z = 0
      camera.fov = 65
    } else if (i < 58) {
      camera.position.x = -11
      camera.position.y = 9.5
      camera.position.z = ((((elapsed - 16) / 36) % 2) - 1) * 19
      camera.rotation.x = Math.PI / 2 - 0.2
      camera.rotation.y = 0.3
      camera.rotation.z = Math.PI
      camera.fov = 65
    } else if (i < 60) {
      elapsed -= 230
      camera.position.x = -(((elapsed * 0.1)) - 1) * 4 + 8
      camera.position.y = 12.5 - elapsed * 0.05
      camera.position.z = 18
      camera.rotation.x = -elapsed * 0.01
      camera.rotation.y = Math.PI - elapsed * 0.11 + 1
      camera.rotation.z = 0
      camera.fov = 65 - elapsed
    }
    else if (i < 66) {
      elapsed -= 238
      camera.position.x = -(((elapsed * 0.1)) - 1) * 4 + 14
      camera.position.y = 13 - elapsed * 0.05
      camera.position.z = 18
      camera.rotation.x = -elapsed * 0.01
      camera.rotation.y = Math.PI
      camera.rotation.z = 0
      camera.fov = 50 - elapsed
    }
    else if (i < 80) {
      camera.position.x = 0
      camera.position.y = 14
      camera.position.z = (((elapsed / 32) % 2) - 1) * 20
      camera.rotation.x = Math.PI / 2
      camera.rotation.y = 0
      camera.rotation.z = 0
      camera.fov = 100
    }
    else if (i % 4 == 0) {
      camera.position.x = 0
      camera.position.y = 12
      camera.position.z = 0
      camera.rotation.x = (((elapsed / 32) % 2) - 1) * 40
      camera.rotation.y = 0
      camera.rotation.z = 0
      camera.fov = 100
      camera.fov += Math.max(0, ((4 * elapsed) % 1) - 0.8) * 10
    }
    else if (i % 4 == 1) {
      camera.position.x = 0
      camera.position.y = 12
      camera.position.z = 0
      camera.rotation.x = 0
      camera.rotation.y = (((elapsed / 32) % 2) - 1) * 40
      camera.rotation.z = 0
      camera.fov = 100
      camera.fov += Math.max(0, ((4 * elapsed) % 1) - 0.8) * 10
    }
    else if (i % 4 > 1) {
      camera.position.x = 0
      camera.position.y = 12 + Math.tan(elapsed * Math.PI / 2)
      camera.position.z = 0
      camera.rotation.x = 0 + Math.tan(elapsed * Math.PI / 2 + Math.PI) * 0.1
      camera.rotation.y = 0
      camera.rotation.z = Math.sin(elapsed * Math.PI / 2)
      camera.fov = 100
      camera.fov += Math.max(0, ((4 * elapsed) % 1) - 0.8) * 10
    }

    // camera.fov += Math.tan(elapsed * Math.PI / 2)
    // // camera.fov = 60 + elapsed
    // camera.fov += Math.max(0, ((4 * elapsed) % 1) - 0.8) * 10
    camera.updateProjectionMatrix()

    light2.position.z = (((elapsed * 0.125) % 2) - 1) * 70
    light3.position.z = ((((elapsed + 4) * 0.125) % 2) - 1) * 70

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
}

main()
