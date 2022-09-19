import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-champions',
  templateUrl: './modal-champions.component.html',
  styleUrls: ['./modal-champions.component.css']
})
export class ModalChampionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
