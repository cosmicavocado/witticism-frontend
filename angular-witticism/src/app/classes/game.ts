export class Game {
    public id: number;
    public code: string;
    public round: number;
    public responseCount: string;
    public prompts: string[];
    public currPrompt: string;
    public votes: string;
    public stage: string;
    public isActive: boolean;
}
