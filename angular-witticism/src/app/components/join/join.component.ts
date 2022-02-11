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
  join: boolean = false;
  start: boolean = false;

  constructor(private gameService: GameService) {
    this.joinForm = new FormGroup({
      'code': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      'name': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(12)])
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
      this.start = true;
      return response;
    })
    window.open(`http://localhost:4200/player/${code}/${name}`,'_self');
  }

}
