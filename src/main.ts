import { InputHandler } from './Core/InputHandler'
import { ScoreManager } from './Core/ScoreManager.ts'
import { Game } from './Game/Game'
import './main.css'
import { Renderer } from './Rendering/Renderer'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const renderer = new Renderer(canvas)
const inputHandler = new InputHandler()
const scoreManager = new ScoreManager()

const game = new Game(renderer, inputHandler, scoreManager, window.innerWidth, window.innerHeight)

resizeCanvas()

window.addEventListener('resize', resizeCanvas)

game.start()
