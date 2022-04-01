
import { GameState } from "../GameState";
import { StateChange } from "./StateChange";
import { Paddle, PaddleDirection, PaddleID } from "../Paddle";


export class AddDirection implements StateChange{
    //public player:number; 
    constructor(
        public paddleID:PaddleID,
        public direction:PaddleDirection){
    }

    apply(s:GameState):GameState{
        let paddle:Paddle;
        switch(this.paddleID){
        case(PaddleID.PLAYER):
            paddle = s.playerPaddle;
            break;
        case(PaddleID.OPPONENT):
            paddle = s.opponentPaddle;
            break;
        default:
            console.log("move AddDirection hit default");
            paddle = s.playerPaddle;
            break;
        }
        paddle.direction.add(this.direction);
        return s;
    }
}

export class RemoveDirection implements StateChange{
    //public player:number; 
    constructor(
        public paddleID:PaddleID,
        public direction:PaddleDirection){
    }

    apply(s:GameState):GameState{
        let paddle:Paddle;
        switch(this.paddleID){
        case(PaddleID.PLAYER):
            paddle = s.playerPaddle;
            break;
        case(PaddleID.OPPONENT):
            paddle = s.opponentPaddle;
            break;
        default:
            console.log("move AddDirection hit default");
            paddle = s.playerPaddle;
            break;
        }
        paddle.direction.delete(this.direction);
        return s;
    }
}


