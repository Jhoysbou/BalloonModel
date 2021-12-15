import { Point } from '../structs/Point'
import { Vector } from '../structs/Vector'
import { MASS, TIME_STEP } from './constants'
import { ModelData } from '../context/ModelContext'
import { Spring } from '../structs/Spring'

export const integrate = (state: ModelData): Point[] => {
  console.debug(state)
  const velocities: Vector<number>[] = []
  let points = state.points

  points = points.map(point => {
    const velocity: Vector<number> = point.getVelocity()
    const force: Vector<number> = point.getForce()

    point.x += velocity.x * TIME_STEP + 0.5 * (force.x / MASS) * TIME_STEP * TIME_STEP
    point.y += velocity.y * TIME_STEP + 0.5 * (force.y / MASS) * TIME_STEP * TIME_STEP

    console.debug(`x=${point.x} y=${point.y}`)

    velocities.push(new Vector<number>(
      velocity.x + 0.5 * (force.x / MASS) * TIME_STEP,
      velocity.y + 0.5 * (force.y / MASS) * TIME_STEP
    ))
    return point
  })

  points = calculateForces(points, state.pressure)

  for (let i = 0; i < points.length; i++) {
    let force = points[i].getForce()
    points[i].setVelocity(new Vector<number>(
      velocities[i].x + 0.5 * force.x / MASS * TIME_STEP,
      velocities[i].y + 0.5 * force.y / MASS * TIME_STEP
    ))
  }

  const vel = points[0].getVelocity()
  console.debug(`velocity x = ${vel.x}, y=${vel.y}`)

  return points
}

const gradPotential = (r: number) => {
  const e = 10**(-10)
  const a = 1
  return 24 * a**6 * e * (-2 * a**6 + r**6) / r**13
}


export const calculateForces = (points: Point[], pressure: number): Point[] => {
  // Remove forces from previous iterations
  points.forEach(point => point.setForce(new Vector<number>(0, 0)))
  // Get all unique springs
  const springs: Array<Spring | undefined> = points.map(point => point.spring)

  let volume = 0.

  springs.forEach((spring) => {
    const force: Vector<number> = spring!.getSpringForce()
    const springLength = spring!.getLength()

    let currentStartForce = spring!.startPoint.getForce()
    let currentEndForce = spring!.endPoint.getForce()

    //Update force for start point
    spring!.startPoint.setForce(new Vector<number>(
      currentStartForce.x - force.x,
      currentStartForce.y - force.y
    ))

    //Update force for end point
    spring!.endPoint.setForce(new Vector<number>(
      currentEndForce.x + force.x,
      currentEndForce.y + force.y
    ))

    // Update normal to a spring
    spring!.normal = spring!.getNormalVector()

    // Calculate the volume
    volume += 0.5 * Math.abs(spring!.startPoint.x - spring!.endPoint.x) * Math.abs(spring!.normal.x) * springLength

    // Pressure
    let springPressure = springLength * pressure / volume
    currentEndForce = spring!.endPoint.getForce()
    currentStartForce = spring!.startPoint.getForce()

    //Update force for start point
    spring!.startPoint.setForce(new Vector<number>(
      currentStartForce.x + spring!.normal.x * springPressure,
      currentStartForce.y + spring!.normal.y * springPressure
    ))

    //Update force for end point
    spring!.endPoint.setForce(new Vector<number>(
      currentEndForce.x + spring!.normal.x * springPressure,
      currentEndForce.y + spring!.normal.y * springPressure
    ))
  })

  return points
}
