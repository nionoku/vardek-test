import { BoxHelper, Color, Mesh, MeshStandardMaterial, Object3D, PlaneGeometry } from "three";
import { WithHelper } from "./types/model";
import GUI from "lil-gui";

class FloorModel extends Mesh implements WithHelper {
  private readonly helper: BoxHelper

  constructor() {
    const geometry = new PlaneGeometry(1, 1);
    const material = new MeshStandardMaterial({ color: new Color('#FFF') })

    super(geometry, material)
    this.name = "floor"

    this.rotation.x = 3 / 2 * Math.PI

    this.helper = new BoxHelper(this, new Color('blue'))
  }

  setHelper(gui: GUI): GUI {
    const folder = gui.addFolder('Пол')
    folder.add(this.helper, 'visible', [true, false])
    this.helper.visible = false
    
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
  FloorModel
}