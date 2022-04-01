import { Ball } from "../State/Ball";
import { GameState } from "../State/GameState";
import { Paddle, PaddleDirection } from "../State/Paddle";
import { StateChange } from "../State/StateChanges/StateChange";
import { Vector2 } from "../State/Vector2";

export class Reset implements StateChange{
    private resetScore = false;
    constructor(resetScore?:boolean){
        if (resetScore !==undefined){
            this.resetScore = resetScore;
        }
    }
    apply(s: GameState): GameState {
        s.playerPaddle = new Paddle(new Vector2(5,250),5,new Set<PaddleDirection>(),new Vector2(2,50));
        s.opponentPaddle = new Paddle(new Vector2(495,250),5,new Set<PaddleDirection>(),new Vector2(2,50));
        s.ball = new Ball(new Vector2(250,250),2.1,Math.PI*5/8);
        if(this.resetScore){
            s.playerScore = 0;
            s.opponentScore = 0;
        }
        return s;
    }

}