import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './components/host/host.component';
import { JoinComponent } from './components/join/join.component';
import { MenuComponent } from './components/menu/menu.component';


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
    component: HostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
