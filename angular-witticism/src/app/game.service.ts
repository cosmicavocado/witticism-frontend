import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl: string = 'http://localhost:9092/api/game'

  constructor(private http: HttpClient) { }

  // create game

  // get players
  getPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(`${this.baseUrl}/1/players`);
  }
}
