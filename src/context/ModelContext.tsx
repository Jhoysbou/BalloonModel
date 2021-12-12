import { createContext, FC, ReactNode, useState } from 'react'
import { Point } from '../structs/Point'
import { Action, ActionsTypes } from './actions'

interface ModelData {
  points: Point[]
  walls: Point[]
}

interface ModelContextProviderProps {
  children: Element | ReactNode
}

export type ModelType = [ModelData, (arg0: Action) => void]

// I know it's bad :|
// @ts-ignore
export const ModelContext = createContext<ModelType>(null)

export const ModelContextProvider: FC<ModelContextProviderProps> = ({ children }) => {
  const [modelState, setModelState] = useState<ModelData>({
    points: [new Point(350, 350)],
    walls: []
  })

  const handler = (action: Action) => {
    switch (action.type) {
      case ActionsTypes.START_MODELING:
        break
      case ActionsTypes.PAUSE_MODELING:
        break
      case ActionsTypes.STOP_MODELING:
        break
    }
  }

  return (
    <ModelContext.Provider value={[modelState, handler]}>{children}</ModelContext.Provider>
  )
}
