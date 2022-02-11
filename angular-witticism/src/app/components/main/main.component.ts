import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/classes/game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  game: Game;
  
  constructor() { }

  ngOnInit(): void {
  }

}
