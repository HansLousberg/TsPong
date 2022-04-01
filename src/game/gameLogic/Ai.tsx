import { GameState } from "../State/GameState";
import { StateChange } from "../State/StateChanges/StateChange";

export interface AI{
    createAction(state:GameState):Set<StateChange>
}