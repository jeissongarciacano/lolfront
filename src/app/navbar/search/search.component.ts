import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Entry } from 'contentful';
import { ModalChampionsComponent } from 'src/app/store/modal-champions/modal-champions.component';
import { ContentfulService } from 'src/service/contentful.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(public dialog: MatDialog, public contentfulService: ContentfulService) { }

  public lolChampions: Entry<any>[] = [];
  i: number = 0;

  ngOnInit(): void {
    this.contentfulService.getChampions()
      .then(lolChampions => this.lolChampions = lolChampions)
  }


  getChamp(name: string) {
    name = name.trim().toUpperCase()
    this.i = 0;
    while (this.i < this.lolChampions.length && name != this.lolChampions[this.i].fields.championName.trim().toUpperCase()) this.i++
    if (this.i < this.lolChampions.length) {
      this.openModal("500ms", "500ms", this.lolChampions[this.i])
    } 
  }

  openModal(enterAnimationDuration: string, exitAnimationDuration: string, champ: Entry<any>): void {
    this.dialog.open(ModalChampionsComponent, {
      width: '800px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        champ
      }
    });
  }

}
