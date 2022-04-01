import { Trajectory } from "./Trajectory";
import { Vector2 } from "./Vector2";
/*
export class Ball{
    constructor(
        public position:Vector2,
        public speed:Vector2){}
}
*/
export class Ball{
    private vector?:Vector2 = undefined;
    constructor(
        public position:Vector2,
        public speed:number,
        private direction:number){
    }
    
    public setDirection(direction:number){
        this.direction = direction;
        this.vector = undefined;
    }

    public getDirection():number{
        return this.direction 
    }

    public getDirectionAsVector():Vector2{
        if(!this.vector){
            this.vector = new Vector2(Math.cos(this.direction),Math.sin(this.direction))
        }
        return this.vector
    }

    public getTrajectory():Trajectory{
        return new Trajectory(this.position,this.getDirectionAsVector(),this.speed)
    }
}