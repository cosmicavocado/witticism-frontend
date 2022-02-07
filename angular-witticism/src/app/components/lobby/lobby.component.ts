import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/game';
import { GameService } from '../../game.service'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  game: Game;
  code: string = '';
  host: string = '';

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
    })
  }

  startGame() {
    console.log("Starting game");
    this.gameService.startGame(this.code).subscribe(response => {
      console.log(response),
      (err: string) => console.log(err),
      this.game = response;
      return response;
    });
    window.open(`http://localhost:4200/main/${this.code}`);
    window.open(`http://localhost:4200/player/${this.code}`,'_self');
  }
}
