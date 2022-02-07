import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from './player';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl: string = 'http://localhost:9092/api/game'
  headers = new HttpHeaders({'Content-Type': 'application'});
  body = {};
  public game: Game;

  constructor(private http: HttpClient) { }

  // create game
  createGame(code: string, name: string): Observable<any> {
    const url = `${this.baseUrl}/${code}/host/${name}`;
    return this.http.post(url,this.body, {headers: this.headers, observe: "response"});
  }

  // join game
  joinGame(code: string, name: string): Observable<any> {
    const url = `${this.baseUrl}/${code}/join/${name}`;
    return this.http.post(url,this.body, {headers: this.headers, observe: "response"});
  }

  // start game
  startGame(code: string): Observable<Game> {
    const url = `${this.baseUrl}/${code}/start`;
    return this.http.get<Game>(url);
  }

  // get players
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/1/players`);
  }
}
