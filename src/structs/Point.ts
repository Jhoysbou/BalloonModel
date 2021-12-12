import { Spring } from './Spring'
import { Vector } from './Vector'

export class Point {
  x: number
  y: number
  private velocity?: Vector<number> // px in step
  springs: Spring[]

  constructor(x: number, y: number, velocity?: Vector<number>) {
    this.x = x
    this.y = y
    this.velocity = velocity
    this.springs = []
    console.debug('point created')
  }

  attachSpring(point: Point): void {
    let spring = new Spring(this, point)
    this.springs.push(spring)
    point.springs.push(spring)
  }

  setVelocity(x: number, y: number): void {
    this.velocity = new Vector<number>(x, y)
  }

  getVelocity(): Vector<number> | undefined {
    return this.velocity
  }
}
