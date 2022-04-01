//score

import { Ball } from "./Ball";
import { HorizontalBorder } from "./HorizontalBorder";
import { Paddle } from "./Paddle";

export class GameState{
    public playerScore = 0;
    public opponentScore = 0;
    constructor(
        public playerPaddle:Paddle,
        public opponentPaddle:Paddle,
        public horizontalBorders:HorizontalBorder[],
        public ball:Ball,
        public height:number,
        public length:number,
    ){}
}
