import GUI from "lil-gui"
import { Object3D } from "three"

type WithHelper = {
  setHelper(gui: GUI): GUI
  update(): void

  get objects(): Object3D[]
}

export type {
  WithHelper
}