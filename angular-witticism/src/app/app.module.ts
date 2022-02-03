import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HostComponent } from './components/host/host.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { ResponseComponent } from './components/response/response.component';
import { AnswersComponent } from './components/answers/answers.component';
import { VoteComponent } from './components/vote/vote.component';
import { WaitComponent } from './components/wait/wait.component';
import { PromptScreenComponent } from './components/prompt-screen/prompt-screen.component';
import { GameService } from './game.service';
import { JoinComponent } from './join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MenuButtonComponent,
    SidebarComponent,
    HostComponent,
    PromptComponent,
    ResponseComponent,
    AnswersComponent,
    VoteComponent,
    WaitComponent,
    PromptScreenComponent,
    JoinComponent,
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
