import React, { useContext, useEffect, useRef } from 'react'
import './App.css'
import { ModelContext } from './context/ModelContext'

function App() {
  const [data, handler] = useContext(ModelContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const connectCanvas = (func: (canvas: HTMLCanvasElement) => void) => () => func(canvasRef.current!)

  const renderPoints = connectCanvas((canvas): void => {
    // data.points.forEach((point) =>)
  })

  const renderWalls = connectCanvas((canvas): void => {

  })

  useEffect(() => {
    renderPoints()
    renderWalls()
  }, [data, renderPoints, renderWalls])

  return (
    <div className="App">
      <canvas ref={canvasRef} width={700} height={700}/>
    </div>
  )
}

export default App
