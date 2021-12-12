import React, { useContext, useEffect, useRef } from 'react'
import './App.css'
import { ModelContext } from './context/ModelContext'

const canvasSize = {
  width: 700,
  height: 700
}

function App() {
  const [data, handler] = useContext(ModelContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const connectCanvas = (func: (canvas: CanvasRenderingContext2D) => void) => () => func(canvasRef.current!.getContext('2d')!)

  const renderPoints = connectCanvas((context): void => {
    data.points.forEach((point) => {
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI, false)
      context.fillStyle = 'green';
      context.fill();
      context.strokeStyle = 'blue'
      point.springs.map(spring => {context.lineTo(spring.endPoint.x, spring.endPoint.y); context.closePath()})
      context.closePath()
    })
  })

  const renderWalls = connectCanvas((context): void => {

  })

  const clearCanvas = connectCanvas((context): void => {
    context.clearRect(0, 0, canvasSize.width, canvasSize.height)
  })

  useEffect(() => {
    renderPoints()
    renderWalls()
  }, [data])

  return (
    <div className="App">
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height}/>
    </div>
  )
}

export default App
