import { Spring } from './Spring'
import { Vector } from './Vector'

export class Point {
  x: number
  y: number
  private velocity: Vector<number> // px in step
  private force: Vector<number>
  springs: Spring[]

  constructor(x: number, y: number, velocity?: Vector<number>) {
    this.x = x
    this.y = y
    this.velocity = velocity ? velocity : new Vector<number>(0, 0)
    this.force = new Vector<number>(0, 0)
    this.springs = []
    console.debug('point created')
  }

  attachSpring(point: Point): void {
    let spring = new Spring(this, point)
    this.springs.push(spring)
    point.springs.push(spring)
  }

  setVelocity(velocity: Vector<number>): void {
    this.velocity = velocity
  }

  getVelocity(): Vector<number> {
    return this.velocity
  }

  getForce(): Vector<number> {
    return this.force
  }

  setForce(force: Vector<number>): void {
    this.force = force
  }
}
