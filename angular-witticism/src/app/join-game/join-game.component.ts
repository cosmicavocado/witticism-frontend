import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from '../game.service';
import { Game } from '../game'

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  public joinForm: FormGroup;
  public game: Game;

  constructor(private gameService: GameService) {
    this.joinForm = new FormGroup({
      'code': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  joinGame(code: string, name: string) {
    console.log("Code: " + code + " Name: " + name);
    this.gameService.joinGame(code, name).subscribe((game: Game) => {
      console.log(game);
      return this.game = game;
    })
  }

  test() {
    console.log(this.joinForm.value)
  }

}
