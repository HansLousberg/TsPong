import * as React from "react";
import { PaddleDirection, PaddleID } from "./State/Paddle";
import { StateChange } from "./State/StateChanges/StateChange";
import { AddDirection, RemoveDirection } from "./State/StateChanges/Move";

/**
 *
 */
interface Props {
    draw: (ctx: CanvasRenderingContext2D, frame: number) => void;
    mouseDownEvent: () => void;
    width: number;
    height: number;
    stateChangeEvent: (sc: StateChange) => void;
}

/**
 *
 */
interface State {
    frameCount: number;
    animFrameID?: number;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}


/**
 *
 */
export class Canvas
    extends React.Component<Props, State> {

    /**
     *
     * @param props
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            frameCount: 0,
            canvasRef: React.createRef(),
        };

        this.keyPressEventHandler = this.keyPressEventHandler.bind(this);
        this.mapReleaseEvent = this.mapReleaseEvent.bind(this);
        this.keyReleaseEventHandler = this.keyReleaseEventHandler.bind(this);

        this.loopFrame = this.loopFrame.bind(this);

    }

    /**
     *
     */
    public componentDidMount() {
        this.createUserEvents();
        this.loopFrame();
    }

    private createUserEvents(){
        window.addEventListener("keydown",this.keyPressEventHandler);
        window.addEventListener("keyup",this.keyReleaseEventHandler);
    }

    /**
     * cleanup the animation loop
     */
    public componentWillUnmount() {
        this.removeUserEvents();
        if (this.state.animFrameID) {
            window.cancelAnimationFrame(this.state.animFrameID);
            this.setState({
                animFrameID: undefined,
            });
            
        }
    }

    private removeUserEvents(){
        window.removeEventListener("keydown",this.keyPressEventHandler);
        window.addEventListener("keyup",this.keyReleaseEventHandler);

    }
    /**
     * loopFrame is called in a recursive fashion through
     * window.requestAnimationFrame.
     */
    public loopFrame() {
        const ctx = this.state.canvasRef.current?.getContext("2d");
        const frame = this.state.frameCount + 1;
        if (ctx) {
            this.props.draw(ctx, frame);
        }
        const nextFrameID = window.requestAnimationFrame(this.loopFrame);

        this.setState({
            frameCount: frame,
            animFrameID: nextFrameID,
        });
    }

    /**
     * render the canvas
     */
    public render(): JSX.Element {
        return (<canvas
            height={this.props.height}
            width={this.props.width}
            ref={this.state.canvasRef}
            style={{
                border: "1px solid black",
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: `-${Math.round(this.props.width / 2)}px`,
                marginTop: `-${Math.round(this.props.height / 2)}px`,
            }}
        />);
    }

    private keyPressEventHandler(e:KeyboardEvent){
        if(e.repeat){
            return;
        } 
        const sc = this.mapPressEvent(e);
        if (sc) { 
            this.props.stateChangeEvent(sc); 
        }
    }

    private mapPressEvent(e: KeyboardEvent): any{
        switch(e.key){
        case "w":
            return new AddDirection(PaddleID.PLAYER,PaddleDirection.UP);
        case "s":
            return new AddDirection(PaddleID.PLAYER,PaddleDirection.DOWN);
        default:
            return undefined;
        }
    }

    public keyReleaseEventHandler(e:KeyboardEvent){
        const sc = this.mapReleaseEvent(e);
        if (sc) { this.props.stateChangeEvent(sc); }
    }

    public mapReleaseEvent(e: KeyboardEvent): any{
        switch(e.key)
        {
        case "w":
            return new RemoveDirection(PaddleID.PLAYER,PaddleDirection.UP);
        case "s":
            return new RemoveDirection(PaddleID.PLAYER,PaddleDirection.DOWN);
        default:
            return undefined;
        }
    }

    

}
