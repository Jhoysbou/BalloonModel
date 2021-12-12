import { Point } from '../structs/Point'
import { Vector } from '../structs/Vector'

export const movePoints = (points: Point[]): Point[] => {
  return points.map(point => {
    let velocity: Vector<number> | undefined = point.getVelocity()
    if (velocity) {
      point.x += velocity.x
      point.y += velocity.y
    }
    return point
  })
}

export const calculateForces = (points: Point[]): Point[] => {
  // Get all unique springs
  const springs = points
    .map(point => point.springs)
    .flat()
    .filter((v, i, a) => a.indexOf(v) === i)

  springs.forEach(spring => {
    const force: Vector<number> = spring.getSpringForce()
    const currentStartForce = spring.startPoint.getForce()

    //Update force for start point
    spring.startPoint.setForce(new Vector<number>(
      currentStartForce.x - force.x,
      currentStartForce.y - force.y
    ))

    const currentEndForce = spring.endPoint.getForce()
    //Update force for end point
    spring.endPoint.setForce(new Vector<number>(
      currentEndForce.x + force.x,
      currentEndForce.y + force.y
    ))

    // Update normal to a spring
    spring.normal = spring.getNormalVector()
  })

  let volume = 0.
  

  return points
}
