import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from 'src/app/game.service';
import { Game } from '../../game';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  public hostForm: FormGroup;
  public game: Game;

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

    this.gameService.createGame(code, name).subscribe((game: any) => {
      console.log(game);
      return this.game = game;
    })
  }
  
}
