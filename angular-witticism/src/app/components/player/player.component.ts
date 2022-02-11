import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {interval} from "rxjs/internal/observable/interval";
import { startWith, Subscription, switchMap } from 'rxjs';

import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/classes/game';
import { Player } from 'src/app/classes/player';
import { Response } from 'src/app/classes/response';

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
  subscription: Subscription;
  // players
  players: Array<Player>;
  //scores
  scores: number[];
  // votes
  voteRespText: string;
  voteRespId: number;

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
    // set up game to start
    this.gameService.getGame(this.code)
    .subscribe(game => {
      this.game = game;
      this.gameId = game.id;
      // get player
      this.gameService.getPlayer(this.gameId,this.name).subscribe(player => {
        this.player = player;
        this.playerId = player.id;
        return player;
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
      
      // reponse stage
      if(this.stage === 'response') {
        // get prompt
        this.gameService.getPrompt(this.code)
        .subscribe(prompt => {
          console.log(prompt),
          this.prompt = prompt;
          this.promptId = this.prompt.id;
          return prompt;
        })
        // get player and update values
        this.gameService.getPlayer(this.game.id, this.name).subscribe(player => {
          this.voted = player.voted;
          this.playerId = player.id;
          this.responded = player.responded;
          return player;
        })
        return game;
      }

      // vote stage
      if (this.stage === 'vote') {
        this.gameService.getResponses(this.code, this.promptId)
        .subscribe(responses => {
          this.responses = responses;
          if(this.responses.length == (this.players.length * this.game.round)) {
            this.allResponses = true;
          }
        })
      }

      // score stage
      if (this.stage === 'score') {
        this.gameService.getPlayers(this.game.id).subscribe(players => {
          this.players = players;
          this.allResponses = false;
          this.timeInterval.unsubscribe();
          window.open(`http://localhost:4200/player/${this.code}/${this.name}/results`, '_self');
        })
        
      }

      // end stage
      if(this.stage === 'end') {
        this.timeInterval.unsubscribe();
        window.open(`http://localhost:4200/player/${this.code}/${this.name}/results`, '_self');
      }
      return game;
    })
  }

  sendResponse() {
    let responseText = this.responseForm.get('text').value;
    console.log(responseText);
    this.gameService.sendResponse(this.promptId, this.playerId, responseText)
    .subscribe(response => {
      console.log(response);
      this.text = response;
      this.responded = true;
      return response;
    })
  }

  sendVote($event: Event) {
    // target element
    this.element.nativeElement = $event.target;
    // get playerId as element id
    this.voteRespId = this.element.nativeElement.id + 1;
    console.log(this.voteRespId);
    // select winning response
    let winner: Response = this.responses.find(response => response.playerId === this.voteRespId);
    // post vote
    this.gameService.sendVote(this.code,this.playerId, winner)
    .subscribe(response=> {
      console.log(response);
      return response;
    })
    // update vote status
    this.voted = true;
  }

  viewResults() {
    window.open(`http://localhost:4200/player/${this.code}/${this.name}/results`, '_self');
  }

  mainMenu() {
    window.open(`http://localhost:4200/`, '_self');
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
    this.subscription.unsubscribe();
  }
}
