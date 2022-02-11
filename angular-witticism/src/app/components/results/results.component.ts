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
  name: string;
  game: Game;
  gameId: number;
  players: Player[];

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // map params
    this.route.params.subscribe(params => {
      this.code = params['code'];
      this.name = params['name'];
      return params;
    })
    this.gameService.getGame(this.code).subscribe(game => {
      this.game = game;
      this.gameId = game.id;
      this.gameService.getPlayers(this.gameId).subscribe(players => {
        this.players = players;
        return players;
      })
    })
  }

  goBack() {
    window.open(`http://localhost:4200/player/${this.code}/${this.name}`,'_self');
  }
}
