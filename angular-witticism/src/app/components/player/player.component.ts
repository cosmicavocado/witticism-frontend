import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  code: string = '';
  prompts: any;
  public responseForm: FormGroup;

  constructor(private route: ActivatedRoute, private gameService: GameService) { 
    this.responseForm = new FormGroup({
      'response': new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
    })
    this.gameService.getPrompts(this.code)
    .subscribe(response => {
      console.log(response),
      this.prompts = response;
      (err: string) => console.log(err)
      return response;
    })
  }

  sendResponse() {
    return this.gameService.sendResponse(this.responseForm.value())
  }
}
