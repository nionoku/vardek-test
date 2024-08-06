import './assets/index.css'
import { ViewController } from './controllers/view'
import { MainScene } from './scenes/main'

const main = () => {
  const root = document.getElementById("app")

  if (!root) {
    throw new Error("Invalid root element")
  }

  const vc = new ViewController(root, MainScene)

  window.addEventListener('resize', () => vc.resize())
  root.appendChild(vc.domElement)

  vc.animate()
}

main()