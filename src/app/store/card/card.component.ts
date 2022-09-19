import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentfulService } from "../../../service/contentful.service";
import { Entry } from 'contentful';
import { ModalChampionsComponent } from '../modal-champions/modal-champions.component';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public dialog: MatDialog, private contentfulService: ContentfulService,
    private userService: UserService) { }

  public lolChampions: Entry<any>[] = [];

  unlocked: any;

  ngOnInit(): void {

    this.userService.getSkin().subscribe(res => this.unlocked = res)

    this.contentfulService.getChampions()
      .then(lolChampions => this.lolChampions = lolChampions)
    
    if (localStorage.getItem('firstTime') == "false") { 
      location.reload() 
    } 
    localStorage.setItem('firstTime', "true")
      
  }


  
  unlockedChampion(champ: any) {
    if (this.unlocked) {
      for (let index = 0; index < this.unlocked.Skins.length; index++) {
        if (this.unlocked.Skins[index].champion_skin.trim() == champ.fields.championName.toLowerCase().trim()) {
          return true;
        }        
      }
    }
    return false;
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



