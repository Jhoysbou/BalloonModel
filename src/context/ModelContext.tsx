import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { Point } from '../structs/Point'
import { Action, ActionsType } from './actions'
import { Wall } from '../structs/Wall'
import { calculateForces, integrate } from '../physics/physicsCore'
import { Vector } from '../structs/Vector'
import { PRESSURE, TIME_STEP } from '../physics/constants'

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
  pointsCount = 10,
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
          const points = integrate(modelState)
          if (modelState.pressure < PRESSURE) {
            setModelState({...modelState, points: points, pressure: modelState.pressure + 50})
          }
          setModelState({...modelState, points: points})
        }, TIME_STEP))
        break
      case ActionsType.PAUSE_MODELING:
        // TODO
        break
      case ActionsType.STOP_MODELING:
        //TODO
        break
    }
  }

  return (
    <ModelContext.Provider value={[modelState, handler]}>{children}</ModelContext.Provider>
  )
}
