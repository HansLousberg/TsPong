import { IReflectiveObject } from "./IReflectiveObject";
import { Trajectory } from "./Trajectory";
import { Vector2 } from "./Vector2";

export enum PaddleID{
    PLAYER,
    OPPONENT
}

export enum PaddleDirection{
    UP, DOWN
}

export class Paddle implements IReflectiveObject{
    constructor(
        public position: Vector2,
        public speed:number,
        public direction :Set<PaddleDirection>,
        public size:Vector2,
    ){}
    
    
    // if the trajectory does not intersect with the paddle it returns: 0
    //else it returns the distance between the position and the paddle 0 < n <= distance
    Distance(trajectory: Trajectory): number {
        const distanceX = this.position.x - trajectory.position.x;
        const distance:number = distanceX / trajectory.vector.x;
        if (distance > trajectory.distance
            || distance <= 0){
            return 0;  //path does not intersect
        }
        const distanceY = distanceX / trajectory.vector.x * trajectory.vector.y;
        const intersectionHeigt = trajectory.position.y + distanceY;
        //0 is top of the paddle, 0.5 is middle, 1 is end of paddle
        const intersectFractionPaddle = (intersectionHeigt - this.position.y) / this.size.y;
        if(intersectFractionPaddle<0 || intersectFractionPaddle>1){
            return 0; //path does not intersect
        }
        return distance;

    }

    //assumption: the trajectory does intersect with the paddle
    Reflect(trajectory: Trajectory): Trajectory {
        const distanceX = this.position.x - trajectory.position.x;
        const distanceY = distanceX / trajectory.vector.x * trajectory.vector.y;
        const intersectionHeigt = trajectory.position.y + distanceY;

        const intersectionPoint:Vector2 = new Vector2(this.position.x,intersectionHeigt);
        const distanceLeft = trajectory.distance - this.Distance(trajectory);
        let newDirection: number = this.newDirection(intersectionHeigt);
        if(trajectory.vector.x > 0){
            newDirection = Math.PI - newDirection;
            console.log("adjusted");
        }
        const vector:Vector2 = new Vector2(Math.cos(newDirection),Math.sin(newDirection));
        console.log(vector);
        return new Trajectory(intersectionPoint,vector,distanceLeft);
    }


    public newDirection(intersectionHeigt:number):number{
        //0 is top of the paddle, 0.5 is middle, 1 is end of paddle
        const intersectFractionPaddle = (intersectionHeigt - this.position.y)/this.size.y;
        //-0.5 is top of paddle 0 is middle, 0.5 is end of paddle 
        let intsectMiddleAdjusted = intersectFractionPaddle -0.5;
        
        if(intsectMiddleAdjusted < -0.45){
            intsectMiddleAdjusted = -0.45;
        }
        else if(intsectMiddleAdjusted>0.45){
            intsectMiddleAdjusted=0.45;
        }
        return intsectMiddleAdjusted * Math.PI;
        
    }
}