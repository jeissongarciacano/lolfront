import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { delay, of } from 'rxjs';


@Component({
  selector: 'app-modal-champ',
  templateUrl: './modal-champ.component.html',
  styleUrls: ['./modal-champ.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChampComponent implements OnInit {

  durationInSeconds = 5;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, public userService: UserService, private cdr: ChangeDetectorRef, private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this.userService.getUserInfo()
    console.log(this.data.data.fields)
  }

  closeModal() {
    this.dialog.closeAll();
  }

  buyChamp() {
    const nameSkin = this.data.data.fields.title.toLowerCase()
    const price = parseInt(this.data.data.fields.description)
    const nameChamp = this.data.nameChamp
    this.userService.shopSkins(nameChamp, nameSkin, price).subscribe((res) => 
    {this.openSnackBar(`Ha comprado a ${nameSkin.toUpperCase()}
     en breves momentos se vera reflejado tu compra`, "OK");

    localStorage.setItem('firstTime', "false")
    this.router.navigate([""])

    },
      error => this.erroHandler(error))    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  erroHandler(error: any) {
    if (error.status == 401) {
      this.openSnackBar("Debes iniciar sesion para comprar un skin o campeon", "OK")
    }
    if (error.status == 404) {
      this.openSnackBar("Debes comprar primero el Campeon para obtener la skin", "OK")
    }
  }
}
