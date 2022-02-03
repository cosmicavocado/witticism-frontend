import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from './player';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl: string = 'http://localhost:9092/api/game'
  body = {};

  constructor(private http: HttpClient) { }

  // create game
  // hostOrJoinGame(code: string, name: string): Observable<any> {
  //   const body = JSON.stringify(new Join(code, name));
  //   return this.http.post(`${this.baseUrl}`, body);
  // }

  // create game
  createGame(code: string, name: string): Observable<any> {
    const url = `${this.baseUrl}/${code}/host/${name}`;
    return this.http.post(url,this.body);
  }

  // join game
  joinGame(code: string, name: string) {
    const url = `${this.baseUrl}/${code}/join/${name}`;
    return this.http.post(url,this.body);
  }

  // get players
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/1/players`);
  }
}
