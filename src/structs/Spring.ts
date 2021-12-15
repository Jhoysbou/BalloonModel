import { Point } from './Point'
import { Vector } from './Vector'
import { SPRING_RATE } from '../physics/constants'

export class Spring {
  // Spring constants
  private _rate = SPRING_RATE
  private _KD = 65.0

  startPoint: Point
  endPoint: Point
  defaultLength: number
  normal: Vector<number>

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.defaultLength = this.getLength()
    this.normal = this.getNormalVector()
  }

  getLength(): number {
    return Math.sqrt(
      (this.startPoint.x - this.endPoint.x) ** 2 + (this.startPoint.y - this.endPoint.y) ** 2
    )
  }

  getSpringForce(): Vector<number> {
    const startPointVelocity: Vector<number> = this.startPoint.getVelocity()
    const endPointVelocity: Vector<number> = this.endPoint.getVelocity()
    const diffVelocity: Vector<number> = new Vector<number>(
      startPointVelocity.x - endPointVelocity.x,
      startPointVelocity.y - endPointVelocity.y
    )
    const currentLength = this.getLength()

    const f = (currentLength - this.defaultLength) * this._rate

    const force: Vector<number> = new Vector<number>(
      ((this.startPoint.x - this.endPoint.x) / currentLength) * f,
      ((this.startPoint.y - this.endPoint.y) / currentLength) * f
    )

    return force
  }

  getNormalVector(): Vector<number> {
    const length = this.getLength()
    return new Vector<number>(
      -(this.startPoint.y - this.endPoint.y) / length,
      (this.startPoint.x - this.endPoint.x) / length
    )
  }
}
