import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './components/host/host.component';
import { MenuComponent } from './components/menu/menu.component';
import { JoinComponent } from './components/join/join.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { MainComponent } from './components/main/main.component';
import { PlayerComponent } from './components/player/player.component';


const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'host',
    component: HostComponent,
  },
  {
    path: 'lobby/:code/:name',
    component: LobbyComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'player/:code/:name',
    component: PlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
