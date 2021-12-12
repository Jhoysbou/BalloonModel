import { Point } from './Point'

export class Wall {
  startPoint: Point
  endPoint: Point

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint
    this.endPoint = endPoint
  }
}
