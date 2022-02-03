import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from '../../game.service';
import { Game } from '../../game'

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

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

  joinGame() {
    console.log(this.joinForm.value)
    
    const code = this.joinForm.get('code').value.toUpperCase();
    const name = this.joinForm.get('name').value.toUpperCase();

    this.gameService.joinGame(code, name).subscribe((response: any) => {
      console.log(response);
      this.game = response.body;
      return response;
    })
    window.open('http://localhost:4200/lobby','_self');
  }

}
