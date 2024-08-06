import GUI from "lil-gui";
import { BoxHelper, Color, CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, SphereGeometry } from "three";
import { WithHelper } from "./types/model";

class DoorHandleModel extends Group implements WithHelper {
  private readonly material = new MeshStandardMaterial({
    color: new Color('#F1E0C9'),
    roughness: 0.35,
    metalness: 0.4
  });
  private readonly helper = new BoxHelper(this, new Color('blue'))

  constructor() {
    super();

    const spherePart = this.makeSpherePart()
    const cylinderPart = this.makeCylinderPart()

    cylinderPart.position.y = -1.3
    // позиционируем ручку у крепления
    cylinderPart.position.y = 0.5
    spherePart.position.y = 1 + cylinderPart.position.y

    this.add(spherePart, cylinderPart)
    this.name = "door-handle"

    this.rotation.x = 3 / 2 * Math.PI
  }

  private makeSpherePart(): Mesh {
    const geom = new SphereGeometry(1, 24, 24)
    const mesh = new Mesh(geom, this.material);

    return mesh;
  }

  private makeCylinderPart(): Mesh {
    const geom = new CylinderGeometry(0.6, 0.6, 1)
    const mesh = new Mesh(geom, this.material);

    return mesh;
  }

  setHelper(gui: GUI): GUI {
    const folder = gui.addFolder('Ручка двери')
    folder.add(this.helper, 'visible', [true, false])
    this.helper.visible = false
    this.update()

    return folder
  }

  update() {
    this.helper.update()
  }

  get objects(): Object3D[] {
    return [this, this.helper]
  }
}

export {
  DoorHandleModel
}