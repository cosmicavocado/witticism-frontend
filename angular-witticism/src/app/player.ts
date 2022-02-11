import { Game } from "./game";

export class Player {
    id: number;
    name: string;
    game: Game;
    host: boolean;
    responses: string;
    score: number;
    responded:  boolean;
    voted: boolean;
}
