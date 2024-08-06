import { PerspectiveCamera } from "three";

class CameraController extends PerspectiveCamera {
  constructor(width: number, height: number) {
    super(75, width / height, 0.1, 1000)
  }

  resize(width: number, height: number) {
    this.aspect = width / height;
    this.updateProjectionMatrix()
  }
}

export {
  CameraController
}