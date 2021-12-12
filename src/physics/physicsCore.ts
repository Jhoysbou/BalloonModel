import { Point } from '../structs/Point'
import { Vector } from '../structs/Vector'
import { MASS, TIME_STEP } from './constants'
import { ModelData } from '../context/ModelContext'

export const integrate = (state: ModelData): Point[] => {
  const velocities: Vector<number>[] = []
  let points = state.points

  points = points.map(point => {
    const velocity: Vector<number> = point.getVelocity()
    const force: Vector<number> = point.getForce()
    velocities.push(new Vector<number>(
      velocity.x + 0.5 * (force.x / MASS) * TIME_STEP,
      velocity.y + 0.5 * (force.y / MASS) * TIME_STEP
    ))
    point.x += velocity.x * TIME_STEP + 0.5 * (force.x / MASS) * TIME_STEP * TIME_STEP
    point.y += velocity.y * TIME_STEP + 0.5 * (force.y / MASS) * TIME_STEP * TIME_STEP
    return point
  })

  calculateForces(points, state.pressure)

  for (let i = 0; i < points.length; i++) {
    let force = points[i].getForce()
    points[i].setVelocity(new Vector<number>(
      velocities[i].x + 0.5 * force.x / MASS * TIME_STEP,
      velocities[i].y + 0.5 * force.y / MASS * TIME_STEP
    ))
  }

  return points
}

export const calculateForces = (points: Point[], pressure: number): Point[] => {
  // Get all unique springs
  const springs = points
    .map(point => point.springs)
    .flat()
    .filter((v, i, a) => a.indexOf(v) === i)

  let volume = 0.

  springs.forEach(spring => {
    const force: Vector<number> = spring.getSpringForce()
    const springLength = spring.getLength()

    let currentStartForce = spring.startPoint.getForce()
    let currentEndForce = spring.endPoint.getForce()

    //Update force for start point
    spring.startPoint.setForce(new Vector<number>(
      currentStartForce.x - force.x,
      currentStartForce.y - force.y
    ))

    //Update force for end point
    spring.endPoint.setForce(new Vector<number>(
      currentEndForce.x + force.x,
      currentEndForce.y + force.y
    ))

    // Update normal to a spring
    spring.normal = spring.getNormalVector()

    // Calculate the volume
    volume += 0.5 * Math.abs(spring.startPoint.x - spring.endPoint.x) * Math.abs(spring.normal.x) * springLength

    // Pressure
    let springPressure = springLength * pressure * (1.0 / volume)
    currentEndForce = spring.endPoint.getForce()
    currentStartForce = spring.startPoint.getForce()

    //Update force for start point
    spring.startPoint.setForce(new Vector<number>(
      currentStartForce.x + spring.normal.x * springPressure,
      currentStartForce.y + spring.normal.y * springPressure
    ))

    //Update force for end point
    spring.endPoint.setForce(new Vector<number>(
      currentEndForce.x + spring.normal.x * springPressure,
      currentEndForce.y + spring.normal.y * springPressure
    ))
  })

  return points
}
