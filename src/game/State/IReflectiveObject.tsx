import { Trajectory } from "./Trajectory";

export interface IReflectiveObject{
    Distance(trajectory:Trajectory):number
    Reflect(trajectory:Trajectory):Trajectory
}