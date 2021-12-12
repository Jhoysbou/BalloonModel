import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { Point } from '../structs/Point'
import { Action, ActionsTypes } from './actions'

interface ModelData {
  points: Point[]
  walls: Point[]
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
  balloonRadius = 70
}) => {
  const [modelState, setModelState] = useState<ModelData>({
    points: [],
    walls: []
  })

  useEffect(() => {
    console.debug('generate')
    let center: Point = new Point(350, 350)

    let points: Point[] = []

    for (let i = 0; i < pointsCount; i++) {
      points.push(
        new Point(
          center.x + balloonRadius * Math.cos(i * 2 * Math.PI / pointsCount),
          center.y + balloonRadius * Math.sin(i * 2 * Math.PI / pointsCount)
        )
      )
    }

    
    setModelState({...modelState, points: points})
  }, [])

  const handler = (action: Action) => {
    switch (action.type) {
      case ActionsTypes.START_MODELING:
        //TODO
        break
      case ActionsTypes.PAUSE_MODELING:
        //TODO
        break
      case ActionsTypes.STOP_MODELING:
        //TODO
        break
    }
  }

  return (
    <ModelContext.Provider value={[modelState, handler]}>{children}</ModelContext.Provider>
  )
}
