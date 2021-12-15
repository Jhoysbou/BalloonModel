import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { Point } from '../structs/Point'
import { Action, ActionsType } from './actions'
import { Wall } from '../structs/Wall'
import { calculateForces, integrate } from '../physics/physicsCore'
import { PRESSURE, TIME_STEP } from '../physics/constants'

let pressure = 0

export interface ModelData {
  points: Point[]
  walls: Wall[]
  pressure: number
}

interface ModelContextProviderProps {
  pointsCount?: number
  balloonCenter?: [x: number, y: number] | 'center' | 'close' | 'far'
  balloonRadius?: number
}

export type ModelType = [ModelData, (arg0: Action) => void]

// I know it's bad :|
// @ts-ignore
export const ModelContext = createContext<ModelType>(null)

export const ModelContextProvider: FC<PropsWithChildren<ModelContextProviderProps>> = ({
  children,
  balloonCenter = 'center',
  pointsCount = 20,
  balloonRadius = 50
}) => {
  const [mainLooper, setMainLooper] = useState<NodeJS.Timeout>()
  const [modelState, setModelState] = useState<ModelData>({
    points: [],
    walls: [],
    pressure: 0
  })

  // initial state
  useEffect(() => {
    console.debug('generate')
    let center: Point = new Point(350, 350)

    let points: Point[] = []

    for (let i = 0; i < pointsCount; i++) {
      points.push(
        new Point(
          center.x + balloonRadius * Math.cos(i * 2 * Math.PI / pointsCount),
          center.y + balloonRadius * Math.sin(i * 2 * Math.PI / pointsCount),
        )
      )
      if (i >= 1) {
        points[i-1].attachSpring(points[i])
        if (i === pointsCount - 1) {
          points[i].attachSpring(points[0])
        }
      }
    }

    let walls: Wall[] = [
      new Wall(
        new Point(100, 600),
        new Point(100, 100)
      )
    ]

    points = calculateForces(points, modelState.pressure)
    setModelState({...modelState, walls: walls, points: points})
  }, [])

  const handler = (action: Action) => {
    console.debug(`action ${action.type}`)
    switch (action.type) {
      case ActionsType.START_MODELING:
        setMainLooper(setInterval(() => {
          if (pressure < PRESSURE) {
            pressure += PRESSURE / 100
          }
          const points = integrate({...modelState, pressure: pressure})
          setModelState({...modelState, points: points})
        }, TIME_STEP))
        break
      case ActionsType.PAUSE_MODELING:
        // TODO
        break
      case ActionsType.STOP_MODELING:
        if (mainLooper) {clearInterval(mainLooper)}
        break
    }
  }

  return (
    <ModelContext.Provider value={[modelState, handler]}>{children}</ModelContext.Provider>
  )
}
