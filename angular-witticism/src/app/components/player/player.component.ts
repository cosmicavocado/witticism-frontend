import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Game } from 'src/app/game';

import { GameService } from 'src/app/game.service';
import { Player } from 'src/app/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {


  // game identifiers
  code: string = '';
  name: string = '';
  game: Game;
  gameId: number;
  // player identifier
  player: Player;
  // prompt identifiers
  prompt: any;
  promptId: number;
  // form variables
  public responseForm: FormGroup;
  text: string = '';
  // game trackers
  responded: boolean = false;
  allResponses: boolean = false;
  phase: string = '';

  constructor(private route: ActivatedRoute, private gameService: GameService) { 
    this.responseForm = new FormGroup({
      'text': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
    })
  }

  ngOnInit(): void {
    // map params
    this.route.params.subscribe(params => {
      this.code = params['code'];
      this.name = params['name'];
      return params;
    })
    // get game
    this.gameService.getGame(this.code)
    .subscribe(game => {
      this.game = game;
      this.gameId = game.id;
      this.gameService.getPlayer(this.gameId,this.name).subscribe(player => {
        this.player = player;
        console.log(player);
        return player;
      })
      return game;
    })
    // get prompt
    this.gameService.getPrompt(this.code)
    .subscribe(prompt => {
      console.log(prompt),
      this.prompt = prompt;
      this.promptId = this.prompt.id;
      return prompt;
    })
  }

  sendResponse() {
    let responseText = this.responseForm.get('text').value;
    console.log(responseText);
    this.gameService.sendResponse(responseText)
    .subscribe(response => {
      console.log(response);
      this.text = response;
      (err: string) => console.log(err)
      this.responded = true;
      return response;
    })
  }
}
