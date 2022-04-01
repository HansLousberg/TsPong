
import { GameState } from "../GameState";

export interface StateChange {
    apply(s: GameState): GameState;
  }