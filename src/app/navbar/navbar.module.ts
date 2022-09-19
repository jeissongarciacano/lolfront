import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ButtonComponent,
    SearchComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
