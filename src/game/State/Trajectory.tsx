import { Vector2 } from "./Vector2";

export class Trajectory{
    constructor(
        public position:Vector2,
        public vector:Vector2,
        public distance:number){

    }

    public getEndpoint():Vector2{
        return this.vector.mul(this.distance).add(this.position)
    }
}