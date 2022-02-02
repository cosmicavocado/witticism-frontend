import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game.service';
import { Player } from 'src/app/player';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public players: Player[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getPlayers().subscribe((players: Player[]) => {
      console.log(players);
      this.players = players;
    })
  }

}
