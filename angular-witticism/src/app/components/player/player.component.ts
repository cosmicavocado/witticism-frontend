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
  prompt: any;
  public responseForm: FormGroup;
  text: string = '';

  constructor(private route: ActivatedRoute, private gameService: GameService) { 
    this.responseForm = new FormGroup({
      'text': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
    })
    this.gameService.getPrompt(this.code)
    .subscribe(response => {
      console.log(response),
      this.prompt = response;
      (err: string) => console.log(err)
      return response;
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
      return response;
    })
  }
}
