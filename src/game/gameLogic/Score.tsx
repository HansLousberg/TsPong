import { Ball } from "../State/Ball";
import { GameState } from "../State/GameState";
import { StateChange } from "../State/StateChanges/StateChange";
import { Reset } from "./reset";

export class Score implements StateChange{


    apply(s: GameState): GameState {
        if(s.ball.position.x<0){
            s.opponentScore += 1
            s = new Reset().apply(s);
        }
        else if(s.ball.position.x > s.length){
            s.playerScore += 1
            s = new Reset().apply(s);
        }

        return s
    }

}