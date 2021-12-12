import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { Point } from '../structs/Point'
import { Action, ActionsType } from './actions'
import { Wall } from '../structs/Wall'
import { calculateForces, movePoints } from '../physics/physicsCore'
import { Vector } from '../structs/Vector'

interface ModelData {
  points: Point[]
  walls: Wall[]
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
    walls: []
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
          new Vector<number>(-1, 0)
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


    setModelState({walls: walls, points: points})
  }, [])

  const handler = (action: Action) => {
    console.debug(`action ${action.type}`)
    switch (action.type) {
      case ActionsType.START_MODELING:
        // setMainLooper(setInterval(() => {
        //   const points = movePoints(modelState.points)
        //   setModelState({...modelState, points: points})
        // }, 16))
        calculateForces(modelState.points)
        break
      case ActionsType.PAUSE_MODELING:
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
