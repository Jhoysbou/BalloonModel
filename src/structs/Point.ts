import { Spring } from './Spring'

export class Point {
  x: number
  y: number
  springs: Spring[]

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.springs = []
  }

  attachSpring(point: Point) {
    let spring = new Spring(this, point)
    this.springs.push(spring)
    point.springs.push(spring)
  }
}
