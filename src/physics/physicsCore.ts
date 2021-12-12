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
