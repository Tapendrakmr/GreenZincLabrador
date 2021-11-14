import { Circle } from './circle.model';
import { Point, Shape, Type } from './shape.model'

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  // collides(other: Shape): boolean {
  //   switch (other.type) {
  //     case Type.CIRCLE:
  //       throw new Error('Implement Rectangle to Circle collision checking');
  //     case Type.RECT:
  //       throw new Error('Implement Rectangle to Rectangle collision checking');
      
  //       default:
  //       throw new Error(`Invalid shape type!`);
  //   }
  // }


  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        // const circle=<Circle>(<any> other)
        const circle:Circle=Circle.fromShape(other)
        const pointDistance :Point=<Point>{
          x:Math.abs(this.center.x-circle.center.x),
          y:Math.abs(this.center.y-circle.center.y)
        }
        if (pointDistance.x> (this.width/2 +circle.radius)){
          return false;
        }
        else if (pointDistance.y >(this.height/2 +circle.radius)){
         return false;
        }
        else if(pointDistance.x<=(this.width/2)){
          return true
        }
        else if(pointDistance.y<=(this.height/2)){
          return true
        }
        const rectToCircleDistancec=Math.pow(pointDistance.x-this.width/2,2)+
         Math.pow(pointDistance.y-this.height/2,2)
        
         return rectToCircleDistancec<=Math.pow(circle.radius,2);

      case Type.RECT:
          const rectB=<Rect>(<any> other)
          if(this.center.x <rectB.center.x+rectB.width &&
            this.center.x+this.width>rectB.center.x &&
            this.center.y<rectB.center.y+ rectB.height &&
            this.height+this.center.y>rectB.center.y){
              return true;
            }
            return false;
        default:
        throw new Error(`Invalid shape type!`);
    }
  }



  

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}
