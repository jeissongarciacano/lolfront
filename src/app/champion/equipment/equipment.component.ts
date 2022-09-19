import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from 'src/service/contentful.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { UserService } from "src/service/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { event } from 'jquery';


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  @Input()
  champName: any;

  public spells: Entry<any>[] = [];
  public items: Entry<any>[] = [];

  counterSpell: number = 0;
  counterItems: number = 0;

  formSpell: FormGroup;
  formItems: FormGroup;

  dataSpells: any;
  dataItems: any;

  constructor(private contentfulService: ContentfulService,
    private fb: FormBuilder, private userService: UserService,
    private _snackBar: MatSnackBar
  ) {

    this.formSpell = this.fb.group({
      checkArray: this.fb.array([])
    })

    this.formItems = this.fb.group({
      checkArray: this.fb.array([])
    })

  }

  ngOnInit(): void {
    this.contentfulService.getSpell()
      .then(spells => this.spells = spells)

    this.contentfulService.getItems()
      .then(items => this.items = items)

    //comprar si el invocador tiene una configuracion de hechizos para el campeon en el que esta ubicado
    this.userService.getSpell().subscribe(res => this.checkedSpell(res, this.champName.toLowerCase()),
      error => this.checkedSpell(error, "Error"))

    this.userService.getItems(this.champName.toLowerCase()).subscribe(res => this.checkedItems(res, this.champName.toLowerCase()),
      error => this.checkedItems(error, "Error"))

  }


  checkedSpell(res: any, champ: string) {
    if (res.status != 401) {
      if (res[champ]) {

        const checkboxSpell01 = document.getElementById(
          `${res[champ].spells[0]}`
        ) as HTMLInputElement | null;

        const checkboxSpell02 = document.getElementById(
          `${res[champ].spells[1]}`
        ) as HTMLInputElement | null;

        checkboxSpell01.checked = true;
        checkboxSpell02.checked = true;
        
        this.formSpell.value.checkArray.

        console.log(checkboxSpell01)

        this.counterSpell = 2;


        //this.formSpell.value.checkArray[0] = res[champ].spells[0];
        //this.formSpell.value.checkArray[1] = res[champ].spells[1];
      }
    }
  }
  //hacer la misma logica de los spells
  checkedItems(res: any, champ: string) {
    if (res.status != 401) {
      if (res[champ]) {

        const checkboxItems01 = document.getElementById(
          `${res[champ].items[0]}`
        ) as HTMLInputElement | null;

        const checkboxItems02 = document.getElementById(
          `${res[champ].items[1]}`
        ) as HTMLInputElement | null;

        const checkboxItems03 = document.getElementById(
          `${res[champ].items[2]}`
        ) as HTMLInputElement | null;

        const checkboxItems04 = document.getElementById(
          `${res[champ].items[3]}`
        ) as HTMLInputElement | null;

        const checkboxItems05 = document.getElementById(
          `${res[champ].items[4]}`
        ) as HTMLInputElement | null;

        const checkboxItems06 = document.getElementById(
          `${res[champ].items[5]}`
        ) as HTMLInputElement | null;

        checkboxItems01.checked = true;
        checkboxItems02.checked = true;
        checkboxItems03.checked = true;
        checkboxItems04.checked = true;
        checkboxItems05.checked = true;
        checkboxItems06.checked = true;

        this.counterItems = 6;
        console.log(res[champ].items[0])
        //this.formSpell.value.checkArray = res[champ].spells[0];
        //this.formSpell.value.checkArray = res[champ].spells[1];
        console.log(this.formSpell)
      }
    }
  }


  checkedStateSpell(event, maxNumber) {
    if (event.target.checked === true) {
      if (this.counterSpell < maxNumber) {
        this.counterSpell++
      } else {
        event.target.checked = false;
      }
    } else if (this.counterSpell > 0) {
      this.counterSpell--;
    }
  }

  checkedStateItems(event, maxNumber) {
    if (event.target.checked === true) {
      if (this.counterItems < maxNumber) {
        this.counterItems++
      } else {
        event.target.checked = false;
      }
    } else if (this.counterItems > 0) {
      this.counterItems--;
    }
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.formSpell.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCheckboxChangeItems(e) {
    const checkArray: FormArray = this.formItems.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitFormSpell(event) {
    //integrar con la api TODO
    //console.log(event)
    if (this.formSpell.value.checkArray.length == 2) {
      this.userService.configureSpells(this.champName.toLowerCase(),
        this.formSpell.value.checkArray[0], this.formSpell.value.checkArray[1])
        .subscribe(res => this.openSnackBar("Configuracion de hechizos guardada", "OK"),
          error => this.errorHandle(error))
    }
  }

  submitFormItems(event) {
    //integrar con la api TODO
    //console.log(event)
    if (this.formItems.value.checkArray.length == 6) {

      var element = [
        this.formItems.value.checkArray[0],
        this.formItems.value.checkArray[1],
        this.formItems.value.checkArray[2],
        this.formItems.value.checkArray[3],
        this.formItems.value.checkArray[4],
        this.formItems.value.checkArray[5]]

      this.userService.configureItems(this.champName.toLowerCase(), element).subscribe(res => this.openSnackBar("Configuracion de items guardada","OK"),
      error => this.errorHandle(error))

    } else {
      this.openSnackBar("Selecciona 6 items", "OK")
    }

    console.log("elementos", element);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  errorHandle(error: any) {
    if (error.status == 401){
      this.openSnackBar("Debe iniciar sesion para guardar","OK")
    }
  }

}
