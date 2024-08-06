import { BoxGeometry, BoxHelper, Color, ColorRepresentation, ExtrudeGeometry, Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, Texture, TextureLoader, Vector2 } from "three";
import { WithHelper } from "./types/model";
import GUI from "lil-gui";
import { DoorHandleModel } from "./door-handle";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import DoorTexturePath from '../assets/textures/door-texture.jpg'

class DoorModel extends Group implements WithHelper {
  private readonly doorSchema = `
    <svg>
      <path d="M 0 0 L 0 1 L 0.4 1 L 0.4 0.8 L 0.25 0.8 L 0.25 0.55 L 0.35 0.55 L 0.35 0.8 L 0.4 0.8 L 0.4 0.5 L 0.25 0.5 L 0.25 0.25 L 0.35 0.25 L 0.35 0.5 L 0.4 0.5 L 0.4 0.2 L 0.25 0.2 L 0.25 0.05 L 0.35 0.05 L 0.35 0.2 L 0.4 0.2 L 0.4 0 Z"></path>
    </svg>
  `

  private readonly helper = new BoxHelper(this, new Color('blue'))

  private readonly doorGlass: Mesh
  
  constructor() {
    super()

    // 1 = 2 метра
    const doorHeight = 1
    // 0.4 = 0.8 метра (80 см)
    const doorWidth = 0.4
    // 0.02 = 0.04 метра (4 см)
    const doorDepth = 0.02

    const doorHandleScale = 0.015

    const glassColor = new Color('#9CD1FF')

    const doorTexture = new TextureLoader().load(DoorTexturePath)
    doorTexture.repeat = new Vector2(1.4, 0.4)
    // doorTexture.offset = new Vector2(0.1, 0.01)

    // дверное полотно
    const doorLeaf = this.makeDoorLeaf(doorDepth, doorTexture)
    // позиционируем дверь в дальнем левом нижнем углу (открывается "от себя")
    doorLeaf.position.y = doorHeight
    // doorLeaf.position.x = doorWidth / 2 * -1
    doorLeaf.position.z = doorDepth * -1

    // ручка на переднем плане
    const doorHandleFront = this.makeDoorHandle()
    doorHandleFront.scale.set(doorHandleScale, doorHandleScale, doorHandleScale)
    // позиционируем ручку по середине полотна по вертикали и -8 см от края по горизонтали
    doorHandleFront.position.z = -doorDepth
    doorHandleFront.position.y = doorHeight / 2 - 0.02
    doorHandleFront.position.x = doorWidth * -1 + 0.03
    
    // ручка на заднем плане
    const doorHandleBack = this.makeDoorHandle()
    doorHandleBack.scale.set(doorHandleScale, doorHandleScale, doorHandleScale)
    doorHandleBack.rotation.z = Math.PI
    // позиционируем ручку по середине полотна по вертикали и -8 см от края по горизонтали
    doorHandleBack.position.y = doorHeight / 2 - 0.02
    doorHandleBack.position.x = doorWidth * -1 + 0.03

    this.doorGlass = this.makeDoorGlass(glassColor)
    this.doorGlass.position.z = -doorDepth / 2
    this.doorGlass.position.y = doorHeight / 2 + 0.055
    this.doorGlass.position.x = doorWidth * -1 + 0.1

    this.add(
      doorLeaf,
      doorHandleFront,
      doorHandleBack,
      this.doorGlass,
    )
    this.name = "door"

    // все внутренние меши должны отбрасывать и принимать тени
    this.traverse((obj) => {
      if ((obj as Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true

        // кроме стекла в двери
        if (["glass"].includes(obj.name)) {
          // obj.receiveShadow = false
          obj.castShadow = false
        }
      }
    })
  }

  private makeDoorLeaf(depth: number, map: Texture) {
    const shapes = new SVGLoader()
      .parse(this.doorSchema)
      .paths
      .map(it => it.toShapes(true))[0]

    const geom = new ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: false
    })
    const material = new MeshStandardMaterial({
      map
    });

    const mesh = new Mesh(geom, material);
    mesh.rotation.x = Math.PI
    mesh.rotation.y = Math.PI

    return mesh
  }

  private makeDoorHandle() {
    return new DoorHandleModel()
  }

  private makeDoorGlass(color: ColorRepresentation): Mesh {
    const geom = new BoxGeometry(0.1, 0.8, 0.0025)
    const material = new MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.4,
      roughness: 0,
      color
    })

    const mesh = new Mesh(geom, material);
    mesh.name = 'glass'

    return mesh
  }

  setHelper(gui: GUI): GUI {
    const folder = gui.addFolder('Дверь')
    folder.add(this.helper, 'visible', [true, false])

    const glassFolder = gui.addFolder('Стекло в двери')
    glassFolder.add(this.doorGlass, 'visible', [true, false])

    this.update()

    return folder
  }

  update(): void {
    this.helper.update()
  }

  get objects(): Object3D[] {
    return [this, this.helper]
  }

}

export { 
  DoorModel
}