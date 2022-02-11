import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {interval} from "rxjs/internal/observable/interval";
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { Game } from 'src/app/game';

import { GameService } from 'src/app/game.service';
import { Player } from 'src/app/player';
import { Response } from 'src/app/response';

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
  playerId: number;
  // prompt identifiers
  prompt: any;
  promptId: number;
  // form variables
  public responseForm: FormGroup;
  text: string = '';
  // game trackers
  responded: boolean = false;
  allResponses: boolean = false;
  voted: boolean;
  stage: string = '';
  responses: Response[];
  // polling
  timeInterval: Subscription;
  // players list
  players: Array<Player>;
 // votes
 voteRespText: string;

  constructor(private route: ActivatedRoute, private gameService: GameService, private element: ElementRef) { 
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
      // get player
      this.gameService.getPlayer(this.gameId,this.name).subscribe(player => {
        this.player = player;
        this.playerId = player.id;
        console.log(player);
        return player;
      })
      // get prompt
    this.gameService.getPrompt(this.code)
    .subscribe(prompt => {
      console.log(prompt),
      this.prompt = prompt;
      this.promptId = this.prompt.id;
      return prompt;
    })
      return game;
    })
    // poll for game changes
    this.timeInterval = interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.gameService.updateGame(this.code))
    ).subscribe(game => {
      console.log(game);
      // update game
      this.game = game;
     // update stage
      this.stage = game.stage;
      // vote stage
      if (this.stage == 'vote') {
        this.gameService.getResponses(this.code, this.promptId)
        .subscribe(responses => {
          this.responses = responses;
        })
      }
    }),
      err => console.log('HTTP Error', err);
  }

  sendResponse() {
    let responseText = this.responseForm.get('text').value;
    console.log(responseText);
    this.gameService.sendResponse(this.promptId, this.playerId, responseText)
    .subscribe(response => {
      console.log(response);
      this.text = response;
      (err: string) => console.log(err)
      this.responded = true;
      return response;
    })
  }

  sendVote($event: Event) {
    this.element.nativeElement = $event.target;
    this.voteRespText = this.element.nativeElement.textContent;
    console.log(`${this.voteRespText}`);
    this.voted = true;
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }
}
