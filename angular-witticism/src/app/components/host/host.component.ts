import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { Game } from '../../classes/game';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  public hostForm: FormGroup;
  public game: Game;
  public join: boolean = false;
  public start: boolean = false;

  constructor(private gameService: GameService) { 
    this.hostForm = new FormGroup({
      'code': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  createGame() {
    console.log(this.hostForm.value)
    
    const code = this.hostForm.get('code').value.toUpperCase();
    const name = this.hostForm.get('name').value.toUpperCase();

    this.gameService.createGame(code, name).subscribe((response) => {
      console.log(response),
      (err: string) => console.log(err),
      this.game = response.body;
      this.join = true;
      return response;
    })
    window.open(`http://localhost:4200/lobby/${code}/${name}`,'_self');
  }
  
}
