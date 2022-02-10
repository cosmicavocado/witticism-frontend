import { Game } from "./game";

export class Player {
    id: number;
    name: string;
    responses: string;
    game: Game;
    host: boolean;
}
