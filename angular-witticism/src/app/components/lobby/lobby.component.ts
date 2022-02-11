import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/classes/game';
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  game: Game;
  code: string = '';
  name: string = '';

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    // map params
    this.route.params.subscribe(params => {
      this.code = params['code'];
      this.name = params['name'];
      return params;
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
    window.open(`http://localhost:4200/player/${this.code}/${this.name}`,'_self');
  }
}
