import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/game';
import { GameService } from 'src/app/game.service';
import { Player } from 'src/app/player';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  code: string
  game: Game;
  gameId: number;
  players: Player[];

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // map params
    this.route.params.subscribe(params => {
      this.code = params['code'];
      return params;
    })
    if(this.code!== null) {
      this.gameService.getGame(this.code).subscribe(game => {
        this.game = game;
        this.gameId = game.id;
      })
    }
  }
}
