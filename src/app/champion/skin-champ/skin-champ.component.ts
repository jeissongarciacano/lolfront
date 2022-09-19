import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/service/user.service';
import { ModalChampComponent } from '../modal-champ/modal-champ.component';



@Component({
  selector: 'app-skin-champ',
  templateUrl: './skin-champ.component.html',
  styleUrls: ['./skin-champ.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkinChampComponent implements OnInit {
  slideIndex: number = 0;
  public fruits: Array<any> = [];
  public id: any;

  @Input()
  champion: any;

  dataSkin: any = [];
  skisArr: any = [];


  constructor(public dialog: MatDialog, private userService: UserService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    //servicio skin compradas
    this.userService.getSkin().subscribe(res => {
      this.setDataSkin(res)
    },
      error => this.setDataSkin(error))
  }

  ngAfterViewInit(): void {
    this.showSlides(this.champion.length + 1);
    this.cdr.markForCheck();
  }


  showSlides(n: number): void {
    let i;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  skinAcquired(skin: string) {
    //console.log(skin)
    if (document.getElementById(skin)) {
      const btncompra = document.getElementById(skin) as HTMLInputElement | null;
      btncompra.remove();
      //console.log("existe", skin)
    }
  }

  setDataSkin(res: any) {
    //console.log(res.status)
    if (res.status != 401) {
      this.dataSkin = res.Skins;
      for (let i = 0; i < this.dataSkin.length; i++) {
        this.skinAcquired(this.dataSkin[i].champion_skin.toUpperCase())
      }
    }
  }

  modalCompra(champ: any, index: number) {
    if (index != 0) {
      var dataFrase: string = "¡Elige un nuevo estilo para tu campeón!";
    } else {
      dataFrase = "¡Compra tu campeón!"
    }
    // console.log(champ)
    this.openModal(champ, dataFrase)
  }

  openModal(data: any, dataFrase: string) {
    this.dialog.open(ModalChampComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      data: {
        data,
        dataFrase,
        nameChamp: this.champion[0].fields.title.toLowerCase()
      }
    });

  }


}


