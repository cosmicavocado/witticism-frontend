import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { MenuComponent } from './components/menu/menu.component';
import { HostComponent } from './components/host/host.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { AnswersComponent } from './components/answers/answers.component';
import { VoteComponent } from './components/vote/vote.component';
import { WaitComponent } from './components/wait/wait.component';
import { GameService } from './game.service';
import { JoinComponent } from './components/join/join.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MainComponent } from './components/main/main.component';
import { PlayerComponent } from './components/player/player.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MenuButtonComponent,
    HostComponent,
    PromptComponent,
    AnswersComponent,
    VoteComponent,
    WaitComponent,
    JoinComponent,
    LobbyComponent,
    MainComponent,
    PlayerComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
