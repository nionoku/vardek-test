import { PCFSoftShadowMap, WebGLRenderer } from "three";

class RendererController extends WebGLRenderer {
  constructor(width: number, height: number) {
    super({
      antialias: true,
    })

    this.setSize(width, height)
    this.setPixelRatio(window.devicePixelRatio)

    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;
  }

  resize(width: number, height: number) {
    this.setSize(width, height)
  }
}

export {
  RendererController
}