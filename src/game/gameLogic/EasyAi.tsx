import { GameState } from "../State/GameState";
import { StateChange } from "../State/StateChanges/StateChange";
import { Ball } from "../State/Ball";
import { Paddle, PaddleDirection, PaddleID } from "../State/Paddle";
import { AddDirection, RemoveDirection } from "../State/StateChanges/Move";
import { AI } from "./Ai";

export class EasyAI implements AI{
    private paddleDeadzoneStart = 0.25;
    private paddleDeadzoneEnd  = 0.75;
    
    constructor(
        paddleDeadzoneStart:number,
        paddleDeadzoneEnd:number
    ){
        this.paddleDeadzoneStart = paddleDeadzoneStart;
        this.paddleDeadzoneEnd = paddleDeadzoneEnd;
    }

    public createAction(state:GameState):Set<StateChange>
    {
        const paddle = state.opponentPaddle;
        const actions:Set<StateChange> = new Set<StateChange>();

        //set direction to only have the correct direction
        if (this.isBallAboveDeadzone(state.ball,state.opponentPaddle)){
            if(!paddle.direction.has(PaddleDirection.UP)){
                actions.add(new AddDirection(PaddleID.OPPONENT,PaddleDirection.UP));
            }
            if(paddle.direction.has(PaddleDirection.DOWN)){
                actions.add(new RemoveDirection(PaddleID.OPPONENT,PaddleDirection.DOWN));
            }
        }
        else if(this.isBallBelowDeadzone(state.ball,state.opponentPaddle)){
            if(paddle.direction.has(PaddleDirection.UP)){
                actions.add(new RemoveDirection(PaddleID.OPPONENT,PaddleDirection.UP));
            }
            if(!paddle.direction.has(PaddleDirection.DOWN)){
                actions.add(new AddDirection(PaddleID.OPPONENT,PaddleDirection.DOWN));
            }
        }
        else{
            if(paddle.direction.has(PaddleDirection.UP)){
                actions.add(new RemoveDirection(PaddleID.OPPONENT,PaddleDirection.UP));
            }
            if(paddle.direction.has(PaddleDirection.DOWN)){
                actions.add(new RemoveDirection(PaddleID.OPPONENT,PaddleDirection.DOWN));
            }
        }
        //console.log(actions);
        return actions;

    }

    private isBallAboveDeadzone(ball:Ball,paddle:Paddle):boolean{
        const DeadzoneStart = paddle.position.y + (paddle.size.y * this.paddleDeadzoneStart);
        return (ball.position.y<DeadzoneStart);
    }

    private isBallBelowDeadzone(ball:Ball,paddle:Paddle):boolean{
        const DeadzoneEnd = paddle.position.y + (paddle.size.y * this.paddleDeadzoneEnd);
        return (ball.position.y>DeadzoneEnd);
    }
}