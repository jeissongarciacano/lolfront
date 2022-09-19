import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverChampComponent } from './champion/cover-champ/cover-champ.component';
import { CardComponent } from './store/card/card.component';

const routes: Routes = [

  {
    path: '',
    component: CardComponent,
  },

  {
    path: 'champion/:id',
    component: CoverChampComponent,
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
