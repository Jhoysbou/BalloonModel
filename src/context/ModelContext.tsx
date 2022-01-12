import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react'
import {Point} from '../structs/Point'
import {Action, ActionsType} from './actions'
import {Wall} from '../structs/Wall'
import {calculateForces, integrate} from '../physics/physicsCore'
import {PRESSURE, TIME_STEP} from '../physics/constants'
import {Vector} from '../structs/Vector'

let pressure = 0
let tfs = 0

export interface ModelData {
  points: Point[]
  walls: Wall[]
  pressure: number
  // Time from start
  TFS: number
}

interface InitialConditionType {
  pointsCount: number
  balloonCenter: [x: number, y: number] | 'center' | 'close' | 'far'
  balloonRadius: number
}

export type ModelType = [ModelData, InitialConditionType, (arg0: Action) => void]

// I know it's bad :|
// @ts-ignore
export const ModelContext = createContext<ModelType>(null)

export const ModelContextProvider: FC<PropsWithChildren<{}>> = ({
                                                                  children
                                                                }) => {
  const [initialConditions, setInitialConditions] = useState<InitialConditionType>({
    balloonCenter: 'close',
    pointsCount: 20,
    balloonRadius: 50
  })
  const [mainLooper, setMainLooper] = useState<NodeJS.Timeout>()
  const [modelState, setModelState] = useState<ModelData>({
    points: [],
    walls: [],
    pressure: 0,
    TFS: 0
  })

  // initial state
  useEffect(() => {
    createPhysicsState()
  }, [initialConditions])

  const createPhysicsState = () => {
    let walls: Wall[] = [
      new Wall(
        new Point(100, 600),
        new Point(100, 100)
      )
    ]

    let center: Point = new Point(350, 350)

    switch (initialConditions.balloonCenter) {
      case 'far':
        center = new Point(500, 350)
        break
      case 'close':
        center = new Point(100 + initialConditions.balloonRadius + 10, 350)
        break
      default:
    }

    let points: Point[] = []

    for (let i = 0; i < initialConditions.pointsCount; i++) {
      points.push(
        new Point(
          center.x + initialConditions.balloonRadius * Math.cos(i * 2 * Math.PI / initialConditions.pointsCount),
          center.y + initialConditions.balloonRadius * Math.sin(i * 2 * Math.PI / initialConditions.pointsCount),
          new Vector<number>(-1, 0)
        )
      )
      if (i >= 1) {
        points[i - 1].attachSpring(points[i])
        if (i === initialConditions.pointsCount - 1) {
          points[i].attachSpring(points[0])
        }
      }
    }

    points = calculateForces(points, modelState.pressure)
    setModelState({...modelState, walls: walls, points: points})
  }

  const stopModeling = () => {
    if (mainLooper) {
      clearInterval(mainLooper)
    }
  }

  const validateIC = (initCond: InitialConditionType) => {
    return !(initCond.balloonRadius < 25 || initCond.balloonRadius > 100 ||
      initCond.pointsCount < 5 || initCond.pointsCount > 50)
  }

  const handler = (action: Action) => {
    console.debug(`action ${action.type}`)
    switch (action.type) {
      case ActionsType.START_MODELING:
        setMainLooper(setInterval(() => {
          if (pressure < PRESSURE) {
            pressure += PRESSURE / 100
          }
          const points = integrate({...modelState, pressure: pressure})
          tfs = tfs + TIME_STEP
          setModelState({...modelState, points: points, TFS: tfs})
        }, TIME_STEP))
        break
      case ActionsType.PAUSE_MODELING:
        stopModeling()
        break
      case ActionsType.STOP_MODELING:
        stopModeling()
        createPhysicsState()
        break
      case ActionsType.CHANGE_INITIAL_CONDITIONS:
        stopModeling()
        const newInitialConditions = {
          ...initialConditions,
          ...action.payload
        }
        if (validateIC(newInitialConditions)) {
          setInitialConditions(newInitialConditions)
        }

        break
    }
  }

  return (
    <ModelContext.Provider value={[modelState, initialConditions, handler]}>{children}</ModelContext.Provider>
  )
}
