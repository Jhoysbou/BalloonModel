import React, {useContext, useEffect, useRef} from 'react'
import './App.css'
import {ActionsType, createAction} from './context/actions'
import {ModelContext} from './context/ModelContext'

const canvasSize = {
  width: 700,
  height: 700
}

function App() {
  const [data, initialConditions, handler] = useContext(ModelContext)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const connectCanvas = (func: (canvas: CanvasRenderingContext2D) => void) => () => func(canvasRef.current!.getContext('2d')!)

  const renderPoints = connectCanvas((context): void => {
    data.points.forEach((point) => {
      context.beginPath()
      context.moveTo(point.x, point.y)
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false)
      context.fillStyle = 'green';
      context.fill();
      context.strokeStyle = 'blue'

      const spring = point.spring!
      context.moveTo(spring.startPoint.x, spring.startPoint.y)
      context.lineTo(spring.endPoint.x, spring.endPoint.y)

      context.stroke()
      context.closePath()
    })
  })

  const renderWalls = connectCanvas((context): void => {
    data.walls.forEach((wall) => {
      context.beginPath()
      context.strokeStyle = 'black'
      context.moveTo(wall.startPoint.x, wall.startPoint.y)
      context.lineTo(wall.endPoint.x, wall.endPoint.y)
      context.stroke()
      context.closePath()
    })
  })

  const clearCanvas = connectCanvas((context): void => {
    context.clearRect(0, 0, canvasSize.width, canvasSize.height)
  })

  useEffect(() => {
    clearCanvas()
    renderPoints()
    renderWalls()
  }, [data])

  return (
    <div className="App">
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height}/>
      <div className="controls">
        <button
          onClick={() => handler(createAction(ActionsType.START_MODELING))}
        >
          Start
        </button>
        <button
          onClick={() => handler(createAction(ActionsType.PAUSE_MODELING))}
        >
          Pause
        </button>
        <button
          onClick={() => handler(createAction(ActionsType.STOP_MODELING))}
        >
          Stop
        </button>
        <span>Particles count:</span>
        <input type="number"
               value={initialConditions.pointsCount}
               min={5}
               max={50}
               onChange={e => {
                 handler(
                   createAction(
                     ActionsType.CHANGE_INITIAL_CONDITIONS,
                     {pointsCount: e.target.value}
                   )
                 )
                 console.debug(e.target.value)
               }}
        />
        <span>Radius:</span>
        <input type="number"
               value={initialConditions.balloonRadius}
               min={25}
               max={100}
               onChange={e => {
                 handler(
                   createAction(
                     ActionsType.CHANGE_INITIAL_CONDITIONS,
                     {balloonRadius: parseInt(e.target.value)}
                   )
                 )
               }}
        />
      </div>
    </div>
  )
}

export default App
