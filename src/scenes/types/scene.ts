import { Scene } from "three"

interface IScene extends Scene {
  /** Вызывается перед рендером */
  update(): void
}

export {
  type IScene
}