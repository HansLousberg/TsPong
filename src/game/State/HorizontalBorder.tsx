import { IReflectiveObject } from "./IReflectiveObject";
import { Trajectory } from "./Trajectory";
import { Vector2 } from "./Vector2";

export class HorizontalBorder implements IReflectiveObject{
    constructor(private Ypos:number){

    }

    // if the trajectory does not intersect with the border it returns: 0
    //else it returns the fraction of the distance between the position and the border 0 < n <= trajectory.distance
    Distance(trajectory: Trajectory): number {
        const distanceY = this.Ypos - trajectory.position.y;
        const distance = distanceY/trajectory.vector.y;
        if(distance > trajectory.distance || distance < 0){
            return 0;
        }
        return distance;
        
    }

    //asumption, trajectory does intersect border
    Reflect(trajectory: Trajectory): Trajectory {
        const distance = this.Distance(trajectory);
        const positionX = trajectory.vector.x * (distance / trajectory.distance) + trajectory.position.x;
        const intersectionPoint:Vector2 = new Vector2(positionX,this.Ypos);
        const distanceLeft = trajectory.distance - distance;
        const newVector:Vector2 = new Vector2(trajectory.vector.x, -1* trajectory.vector.y);

        
        const newtraject = new Trajectory(intersectionPoint,newVector,distanceLeft);
        
        
        
        return newtraject;
    }

}