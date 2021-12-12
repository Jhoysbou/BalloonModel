import { Point } from './Point'

export class Spring {
  startPoint: Point
  endPoint: Point

  constructor(startPoint: Point, endPoint: Point) {
    this.startPoint = startPoint
    this.endPoint = endPoint
  }
}
