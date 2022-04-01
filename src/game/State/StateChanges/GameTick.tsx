
import { Ball } from "../Ball";
import { Paddle, PaddleDirection } from "../Paddle";
import { StateChange } from "./StateChange";
import { Vector2 } from "../Vector2";
import { GameState } from "../GameState";
import { Trajectory } from "../Trajectory";
import { IReflectiveObject } from "../IReflectiveObject";

export class GameTick implements StateChange{
    

    apply(s:GameState):GameState{
        s.ball = this.progressBall(s.ball,s);
        s.playerPaddle = this.progressPaddle(s.playerPaddle,0,s.height);
        s.opponentPaddle = this.progressPaddle(s.opponentPaddle,0,s.height);
        
        return s;
    }

    private progressPaddle(paddle: Paddle, lowerBound:number, upperBound:number):Paddle{
        const upperBoundadj = upperBound - paddle.size.y;
        
        if(paddle.direction.size === 0){
            return paddle;
        }
        if(paddle.direction.values().next().value === PaddleDirection.UP){
            paddle.position.y -= paddle.speed;
            if(paddle.position.y < lowerBound){
                paddle.position.y = 0;
            }
        }
        else{

            paddle.position.y += paddle.speed;
            if(paddle.position.y > upperBoundadj){
                paddle.position.y = upperBoundadj;
            }
        }
        return paddle;
    }

    private progressBall(ball:Ball,state:GameState):Ball{
        let hasBounced = false;
        //let newBallPosition:Vector2 = ball.position.add(ball.getDirectionAsVector().mul(ball.speed));
        let trajectory:Trajectory = ball.getTrajectory();
        
        let firstReflector:IReflectiveObject | null;
        let firstIntersection:number;
        const reflectors:IReflectiveObject[] = [state.horizontalBorders[0],state.horizontalBorders[1],state.playerPaddle,state.opponentPaddle];
        
        do{
            firstReflector = null;
            firstIntersection = trajectory.distance + 1;
            for(let i = 0; i <reflectors.length; i++) {
                const dist = reflectors[i].Distance(trajectory);
                if (dist > 0 && dist < firstIntersection){
                    firstIntersection = dist;
                    firstReflector = reflectors[i];
                }
            }
            if(firstReflector != null){
                
                hasBounced = true;
                trajectory = firstReflector?.Reflect(trajectory);
            }
        }
        while(firstReflector!=null);
        
        if(hasBounced){
            let speedup:number = ball.speed *1.1;
            if(speedup > 0.3){
                speedup = 0.3;
            }
            ball.speed += speedup;
        }
        ball.setDirection(trajectory.vector.radians());
        ball.position = trajectory.getEndpoint();
        return ball;
    }

    private isAbove(position:Vector2,state:GameState):boolean{
        return position.y < 0;
    } 

    private isBelow(position:Vector2,state:GameState):boolean{
        return position.y > state.height;
    }

    private isLeft(position:Vector2,referencePoint: number):boolean{
        return position.x < referencePoint;
    }
    private isRight(position:Vector2,referencePoint: number):boolean{
        return position.x > referencePoint;
    }

    private reflectHorizontal(position :Vector2,referencePoint:number):Vector2{
        return new Vector2(position.x,referencePoint * 2 - position.y);
    }

    private reflectBallHorizontal(ball:Ball):Ball{
        ball.setDirection(-1*ball.getDirection());
        return ball;
    }

    private reflectVertical(position :Vector2,referencePoint:number):Vector2{
        return new Vector2(referencePoint * 2 - position.x,position.y);
    }
    
    private reflectBallVertical(ball:Ball):Ball{
        ball.setDirection(Math.PI-ball.getDirection());
        return ball;
    }
}