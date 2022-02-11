import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Player } from '../classes/player';
import { Game } from '../classes/game';
import { Prompt } from '../classes/prompt';
import { Response } from '../classes/response';

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

  // get game
  getGame(code: string): Observable<any> {
    const url = `${this.baseUrl}/${code}`;
    return this.http.get<Game>(url)
    // .pipe(
    //   map(response => {
    //     if (response.id) {
    //       return response;
    //     } else {
    //       throw new Error("Valid game not returned!")
    //     }
    //   })
    // )
  }

  // get prompts
  getPrompt(code: string): Observable<Prompt[]> {
    const url = `${this.baseUrl}/${code}/draw`;
    return this.http.get<Prompt[]>(url);
  }

  // get player
  getPlayer(gameId: number, name: string): Observable<Player> {
    const url = `${this.baseUrl}/${gameId}/player/${name}`;
    return this.http.get<Player>(url)
    .pipe(
      map(response => {
        if (response.id) {
          return response;
        } else {
          throw new Error("Valid game not returned!")
        }
      })
    )
  }

  // get players
  getPlayers(gameId: number): Observable<Player[]> {
    const url = `${this.baseUrl}/${gameId}/players`;
    return this.http.get<Player[]>(url);
  }

  // send response
  sendResponse(promptId: number, playerId: number, responseText: string): Observable<any> {
    console.log("Calling sendResponse")
    const url = `${this.baseUrl}/response`;
    const body = {
      promptId:`${promptId}`,
      playerId:`${playerId}`,
      responseText:`${responseText}`,
    }
    console.log(body)
    return this.http.post(url,body);
  }

  // update game
  updateGame(code: string): Observable<Game> {
    const url = `${this.baseUrl}/${code}/update`;
    return this.http.get<Game>(url);
  }

  // get responses
  getResponses(code: string, promptId: number): Observable<Response[]> {
    const url = `${this.baseUrl}/${code}/responses/${promptId}`;
    return this.http.get<Response[]>(url);
  }

  // send vote
  sendVote(code: string, playerId: number, response: Response): Observable<any> {
    const url = `${this.baseUrl}/${code}/vote/${playerId}`;
    const body = { response };
    return this.http.post(url, body);
  }
}
