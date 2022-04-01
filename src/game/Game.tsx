import * as React from "react";

import { Canvas } from "./Canvas";
import { Ball } from "./State/Ball";
import { GameState } from "./State/GameState";
import { Paddle, PaddleDirection } from "./State/Paddle";
import { StateChange } from "./State/StateChanges/StateChange";
import { Vector2 } from "./State/Vector2";
import { GameTick } from "./State/StateChanges/GameTick";
import { EasyAI } from "./gameLogic/EasyAi";
import { AI } from "./gameLogic/Ai";
import { HorizontalBorder } from "./State/HorizontalBorder";
import { Score } from "./gameLogic/Score";

export interface State {
    game:GameState;
}

//
export class Game
    extends React.Component<{}, State> {
    private ai:AI;

    
    constructor(props:{}){
        super(props);
        this.draw = this.draw.bind(this);
        this.onInputKey = this.onInputKey.bind(this);
        this.ChangeState = this.ChangeState.bind(this);

        //this.createFirstGameState();
        this.state = {game:this.createFirstGameState()}
        this.ai = new EasyAI(0.25,0.75);

    }

    // setting the base values should happen after each point. while this has been written just for the constructor atm
    private createFirstGameState() :GameState {
        let playerPaddle :Paddle = new Paddle(new Vector2(5,250),5,new Set<PaddleDirection>(),new Vector2(2,50));
        let opponentPaddle :Paddle = new Paddle(new Vector2(495,250),5,new Set<PaddleDirection>(),new Vector2(2,50));
        let ball : Ball = new Ball(new Vector2(250,250),2.1,Math.PI*5/8);
        let borderders:HorizontalBorder[] = [new HorizontalBorder(0),new HorizontalBorder(500)]
        return new GameState(playerPaddle,opponentPaddle,borderders,ball,500,500);
    }
    /**
     *
     * @returns
     */
    public render() {
        return (<Canvas
            height={this.state.game.height}
            width={this.state.game.length}
            draw={this.draw}
            mouseDownEvent={this.onInputKey}
            stateChangeEvent = {this.ChangeState}
        />);
    }

    /**
     * onInputKey is called whenever a player inputs a key
     */
    private onInputKey() {
        console.log(`input`);
        // calculate the next state
        //
        // update this.state
        // that's it!
    }

    private ChangeState(stateChange:StateChange){

        this.setState({game:stateChange.apply(this.state.game)})

    }

    /**
     * draw is responsible for rendering the game screen based on the active
     * state.
     */
    private draw(ctx: CanvasRenderingContext2D, frame: number) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        this.ai.createAction(this.state.game).forEach(action => {
            this.ChangeState(action)
        });
        this.ChangeState(new GameTick())
        this.ChangeState(new Score())


        this.drawPaddle(ctx,this.state.game.playerPaddle);
        this.drawPaddle(ctx,this.state.game.opponentPaddle);
        this.drawBall(ctx,this.state.game.ball);
        this.drawScore(ctx,this.state.game.playerScore,this.state.game.opponentScore)


    }

    

    //probably the different draw functions should be removed from this class to something seperate. (but for now they can live here)
    private drawPaddle(ctx: CanvasRenderingContext2D,paddle:Paddle) {
        //reference point not correct
        //assumption: it's in the middle of the paddle
        //reality: it's in the top left
        ctx.fillRect(paddle.position.x, paddle.position.y, paddle.size.x, paddle.size.y)
    }

    private drawBall(ctx: CanvasRenderingContext2D,ball:Ball){
        //is the ball going to be square? for now yes
        ctx.fillRect(ball.position.x,ball.position.y,3,3);
    }

    private drawScore(ctx:CanvasRenderingContext2D,p1Score:number,p2Score:number){
        let text = "score: " + p1Score + "/" + p2Score 
        ctx.fillText(text,this.state.game.length/2,20);
    }


}
