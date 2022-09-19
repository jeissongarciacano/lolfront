import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';


import { CardComponent } from './card/card.component';
import { ModalChampionsComponent } from './modal-champions/modal-champions.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CardComponent,
    ModalChampionsComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    ModalChampionsComponent,
  ]
})
export class StoreModule { }
