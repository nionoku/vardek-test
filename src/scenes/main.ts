import { Camera, Color, DirectionalLight, DirectionalLightHelper, Scene, Vector3 } from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"
import { IScene } from "./types/scene"
import { FloorModel } from "../models/floor"
import GUI from "lil-gui"
import { DoorModel } from "../models/door"

class MainScene extends Scene implements IScene {
  private readonly gui = new GUI()
  private readonly controls: OrbitControls

  constructor(camera: Camera, canvas: HTMLCanvasElement) {
    super()
    
    this.background = new Color('#D0D0D0')

    camera.position.z = 0.8
    camera.position.y = 0.3
    camera.position.x = -0.45

    this.controls = new OrbitControls(camera, canvas)
    this.controls.target.set(-0.1, 0.25, 0)
    
    this.setupModels()
  }

  private setupModels() {
    this.setupFloor()
    this.setupDoor()
    this.setupLights()
  }

  private setupFloor() {
    const floor = new FloorModel()
    floor.receiveShadow = true

    this.add(...floor.objects)
  }

  private setupDoor() {
    const door = new DoorModel()
    door.scale.set(0.5, 0.5, 0.5)
    door.castShadow = true
    
    const doorScaleGui = this.gui.addFolder('Размер двери')
    doorScaleGui.add(door.scale, 'x', 0.5, 1)
      .onChange((value: number) => {
        door.scale.set(value, value, value)
        door.update()
      })

    const doorOpeningGui = this.gui.addFolder('Открытие двери')
    doorOpeningGui.add(door.rotation, 'y', 0, Math.PI * 3 / 4)
      .onChange(() => door.update())

    this.add(...door.objects)
  }

  private setupLights() {
    const light = new DirectionalLight('white', 2);
    light.position.set(0, 3, 5);
    light.target.position.set(-0.1, 0.25, 0)
    light.castShadow = true

    light.shadow.mapSize.width = 4 * 1024;
    light.shadow.mapSize.height = 4 * 1024;

    this.add(light);
  }

  update() {
    this.controls.update()
  }
}

export {
  MainScene
}