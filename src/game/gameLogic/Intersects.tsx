import { Ball } from "../State/Ball";
import { Paddle } from "../State/Paddle";
import { Vector2 } from "../State/Vector2";

export class Intersect{
    /*
    * if the ball is intersecting with the paddle: returns true
    * if the ball does not intersect with the ball: mostlikely returns false, could return true
    * a false is garanteed no intersection
    */
    public quickIntersection(ball:Ball,nextBallPosition:Vector2,paddle:Paddle):boolean{
        if(!((ball.position.x < paddle.position.x && nextBallPosition.x >= paddle.position.x)
        ||(ball.position.x > paddle.position.x && nextBallPosition.x <= paddle.position.x))){
                return false;
        }if((ball.position.y < paddle.position.y) && (nextBallPosition.y >= paddle.position.y)){
            return true
        }
        if((ball.position.y >= paddle.position.y) && (nextBallPosition.y < paddle.position.y+paddle.size.y)){
            return true
        }
        return false

    }

    
}