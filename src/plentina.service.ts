import { Injectable } from '@nestjs/common'
import { Circle } from './models/circle.model'
import { Line } from './models/line.models'
import { Rect } from './models/rect.model'
import {
  CollideShapesRequest,
  CollideShapesResponse
} from './plentina.controller'

@Injectable()
export class PlentinaService {
  /**
   * Simple health check
   * @returns the applicant's name
   */
  healthCheck(): string {
    return "Tapendra Kumar"
    // throw new Error('Make this function return your name');
  }

  doShapesCollide(request: CollideShapesRequest): CollideShapesResponse {
    let result = false;
    if (request.firstShape.radius && request.secondShape.radius) {
      result = this.doesCircleAndCircleCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.radius,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius,
      );
    } else if (
      request.firstShape.radius  &&
      (request.secondShape.width && request.secondShape.height)
    ) {
      result = this.doesCircleAndRectCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.radius,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height,
      );
    } else if (
      (request.firstShape.width && request.firstShape.height) &&
      request.secondShape.radius
    ) {
      result = this.doesCircleAndRectCollide(
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius,
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height,
      );
    } else if (
      (request.firstShape.width && request.firstShape.height) &&
      (request.secondShape.width && request.secondShape.height)
    ) {
      result = this.doesRectAndRectCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height,
      );
    }
    else if((request.firstShape.x2 && request.firstShape.y2)&& (request.secondShape.x2 && request.secondShape.y2)){
       result =this.doesLineAndLineCollide(
         request.firstShape.x,
         request.firstShape.y,
         request.firstShape.x2,
         request.firstShape.y2,
         request.secondShape.x,
         request.secondShape.y,
         request.secondShape.x2,
         request.secondShape.y2,
       )
    }
    else if((request.firstShape.x2 && request.firstShape.y2 )&&(request.secondShape.radius)){
        result=this.doesLineAndCircleCollide(
          request.firstShape.x,
          request.firstShape.y,
          request.firstShape.x2,
          request.firstShape.y2,
          request.secondShape.x,
          request.secondShape.y,
          request.secondShape.radius
        )
    }
    else if((request.firstShape.radius && (request.secondShape.x2 && request.secondShape.y2))){
        result=this.doesLineAndCircleCollide(
          request.secondShape.x,
          request.secondShape.y,
          request.secondShape.x2,
          request.secondShape.y2,
          request.firstShape.x,
          request.firstShape.y,
          request.firstShape.radius
        )
 
    }
    else if ((request.firstShape.x2 && request.firstShape.y2)&& (request.secondShape.width && request.secondShape.height)){
      result=this.doesLineAndRectCollide(
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.x2,
        request.firstShape.y2,
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height
      )
    }

    else if((request.firstShape.width && request.firstShape.height) &&(request.secondShape.x2 && request.secondShape.y2)){
      result=this.doesLineAndRectCollide(
        request.secondShape.x,
        request.secondShape.y,
        request.secondShape.x2,
        request.secondShape.y2,
        request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height,
      )
    }
    else {
      throw new Error('Invalid shapes!');
    }

    return <CollideShapesResponse>{
      collides: result,
      firstShape: request.firstShape,
      secondShape: request.secondShape,
    };
  }

 /**
   * Checks if a circle and another circle collide
   * @param x1 x-coordinate of the circle
   * @param y1 y-coordinate of the circle
   * @param r1 radius of the circle
   * @param x2 x-coordinate of the second circle
   * @param y2 y-coordinate of the second circle
   * @param r2 radius of the second circle
   * @returns a boolean if they collide or not
   */
  doesCircleAndCircleCollide(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number,
  ): boolean {
    console.log("Circle and Circle")

    const circle1 = new Circle(x1, y1, r1);
    const circle2 = new Circle(x2, y2, r2);

    return circle1.collides(circle2);
  }
  /**
   * Checks if a circle and a rectangle collide
   * @param x1 x-coordinate of the circle
   * @param y1 y-coordinate of the circle
   * @param r radius of the circle
   * @param x2 x-coordinate of the rectangle
   * @param y2 y-coordinate of the rectangle
   * @param w width of the rectangle
   * @param h height of the rectangle
   * @returns a boolean if they collide or not
   */
  doesCircleAndRectCollide(
    x1: number,
    y1: number,
    r: number,
    x2: number,
    y2: number,
    w: number,
    h: number,
  ): boolean {
    console.log("Circle and RECT")
    const circle = new Circle(x1, y1, r);
    const rect = new Rect(x2, y2, w, h);

    return rect.collides(circle);
  }

 

  /**
   * Checks if a rectangle and a second rectangle collide
   * @param x1 x-coordinate of the rectangle
   * @param y1 y-coordinate of the rectangle
   * @param w1 width of the rectangle
   * @param h1 height of the rectangle
   * @param x2 x-coordinate of the second rectangle
   * @param y2 y-coordinate of the second rectangle
   * @param w2 width of the second rectangle
   * @param h2 height of the second rectangle
   * @returns a boolean if they collide or not
   */
  doesRectAndRectCollide(
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number,
  ): boolean {
    console.log("RECT and Rect")
    const rect1 = new Rect(x1, y1, w1, h1);
    const rect2 = new Rect(x2, y2, w2, h2);
    
     return rect1.collides(rect2);
  }
  /**
   * Checks if a Line and a second Line collide
   * @param x1 first x-coordinate of the Line
   * @param y1 first y-coordinate of the Line
   * @param x2 second x-coordinate of the Line
   * @param y2 second y-coordinate of the Line
   * @param x3 first x-coordinate of the second Line
   * @param y3 first y-coordinate of the second Line
   * @param x4 second x-coordinate of the second Line
   * @param y4 second y-coordinate of the second Line
   * @returns a boolean if they collide or not
   */
  doesLineAndLineCollide(
   x1:number,
   y1:number,
   x2:number,
   y2:number,
   x3:number,
   y3:number,
   x4:number,
   y4:number

  ):boolean{
    console.log("Line and Line")
    const line1 =new Line(x1,y1,x2,y2);
    const line2=new Line(x3,y3,x4,y4);
   
    return line1.collides(line2)
  }

 /**
   * Checks if a Line and a Circle collide
   * @param x1 first x-coordinate of the Line
   * @param y1 first y-coordinate of the Line
   * @param x2 second x-coordinate of the Line
   * @param y2 second y-coordinate of the Line
   * @param x3  x-coordinate of the circle center
   * @param y3  y-coordinate of the circle center
   * @param r radius of the circle 
   * @returns a boolean if they collide or not
   */
  doesLineAndCircleCollide(
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    x3:number,
    y3:number,
    r:number
  ):boolean{
    console.log("Line and circle")
    const line =new Line(x1,y1,x2,y2);
    const circle=new Circle(x3,y3,r)

    return line.collides(circle)
  }
/**
   * Checks if a Line and a Rectangle collide
   * @param x1 first x-coordinate of the Line
   * @param y1 first y-coordinate of the Line
   * @param x2 second x-coordinate of the Line
   * @param y2 second y-coordinate of the Line
   * @param x3  x-coordinate of the rect center
   * @param y3  y-coordinate of the rect center
   * @param w width of the rectangle
   * @param h height of the rectangle
   * @returns a boolean if they collide or not
   */
  doesLineAndRectCollide(
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    x3:number,
    y3:number,
    w:number,
    h:number
  ):boolean{
    console.log("line and rect")
    const line=new Line(x1,y1,x2,y2);
    const rect=new Rect(x3,y3,w,h)
    return line.collides(rect)
  }
}
