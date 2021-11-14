import { Circle } from './circle.model';
import { Rect } from './rect.model';
import {  Point, Shape, Type,Endpoint } from './shape.model'

export class Line implements Shape{
  readonly center:Point;
  readonly type:Type;
  readonly endpoint2:Endpoint;
  constructor(x:number,y:number,x2:number,y2:number){
      this.center=<Point>{x,y}
      this.endpoint2=<Endpoint>{x2,y2}
      this.type=Type.LINE
  }
   collides(other: Shape): boolean {
    switch (other.type) {
      case Type.LINE:
        const lineB=<Line>(<any>other);
        const lineColllide=this.lineLineInteraction(this.center.x,this.center.y,this.endpoint2.x2,this.endpoint2.y2,lineB.center.x,lineB.center.y,lineB.endpoint2.x2,lineB.endpoint2.y2);
        if (lineColllide===true){
          return true
        }
        return false
      case Type.CIRCLE:
        const circle:Circle=Circle.fromShape(other)
        const inside1=this.pointCircle(this.center.x,this.center.y,circle.center.x,circle.center.y,circle.radius)
        const inside2=this.pointCircle(this.endpoint2.x2,this.endpoint2.y2,circle.center.x,circle.center.y,circle.radius)
        if (inside1 || inside2){
          return true
        }
        let distX=(this.center.x-this.endpoint2.x2)
        let distY=(this.center.y-this.endpoint2.y2)
        const len=Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2))
        const dot=((circle.center.x-this.center.x)*(this.endpoint2.x2-this.center.x)+((circle.center.y-this.center.y)*(this.endpoint2.y2-this.center.y))) /Math.pow(len,2)
        const closestX=this.center.x+(dot*(this.endpoint2.x2-this.center.x))
        const closestY=this.center.y+(dot*(this.endpoint2.y2-this.center.y))
        const onSegment=this.linePoint(this.center.x,this.center.y,this.endpoint2.x2,this.endpoint2.y2,closestX,closestY)
        if (onSegment==false){
          return false
        }
        distX=closestX-circle.center.x
        distY=closestY-circle.center.y
        const distance=Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2))
        if (distance<=circle.radius){
          return true
        }
        return false
        case Type.RECT:
            const rect:Rect=Rect.fromShape(other);
            const left=this.lineLineInteraction(this.center.x,this.center.y,this.endpoint2.x2,this.endpoint2.y2,rect.center.x,rect.center.y,rect.center.x,rect.center.y+rect.height)
            const right=this.lineLineInteraction(this.center.x,this.center.y,this.endpoint2.x2,this.endpoint2.y2,rect.center.x+rect.width,rect.center.y,rect.center.x+rect.width,rect.center.y+rect.height)
            const top=this.lineLineInteraction(this.center.x,this.center.y,this.endpoint2.x2,this.endpoint2.y2,rect.center.x,rect.center.y,rect.center.x+rect.width,rect.center.y )
            const bottom=this.lineLineInteraction(this.center.x,this.center.y,this.endpoint2.x2,this.endpoint2.y2, rect.center.x,rect.center.y+rect.height,rect.center.x+rect.width,rect.center.y+rect.height)
            
            if(left || right || top|| bottom){
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
   * @returns a Line object
   */
  static fromShape(other: Shape): Line {
    const polymorph = <any>other;
    if (polymorph.radius || polymorph.width || polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Line');
    }

    return new Line(polymorph.center.x, polymorph.center.y,polymorph.p,polymorph.k);
  }
  pointCircle(px:number,py:number,cx:number,cy:number,cr:number){
    const distx=px-cx;
    const disty=py-cy;
    const distance=Math.sqrt(Math.pow(distx,2)+Math.pow(disty,2))
    if (distance<=cr){
      return true
    }
    return false
  }
  linePoint(x1:number,y1:number,x2:number,y2:number,px:number,py:number){
    const d1=this.distanceBetweenPoint(px,py,x1,y1)
    const d2=this.distanceBetweenPoint(px,py,x2,y2)
    const lineLen=this.distanceBetweenPoint(x1,y1,x2,y2);
    if (d1+d2<=lineLen){
      return true
    }
    return false
  }
  distanceBetweenPoint(x1:number,y1:number,x2:number,y2:number){
    return Math.sqrt(
      Math.pow(x1-x2,2)+Math.pow(y1-y2,2)
    )
  }

  lineLineInteraction(x1:number,y1:number,x2:number,y2:number,x3:number,y3:number,x4:number,y4:number){
    const uA=((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const uB=((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
  
      return true;
    }
    return false;
  }

}