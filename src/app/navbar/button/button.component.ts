import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {


  constructor(private route: ActivatedRoute, private userService: UserService) { }

  @Input()
  res: any

  userName: string;
  coins: string;
  rango: string;

  ngOnInit(): void {
    if (this.res) {
      this.userName = this.res.username;
      this.coins = this.res.coins;
      this.rango = this.res.level;
    } else {
      this.userService.getUserInfo(localStorage.getItem('sub')).subscribe(res => this.setInfo(res))
    }
  }

  setInfo(res) {
    this.userName = localStorage.getItem('userName')
    this.coins = localStorage.getItem('coins')
    this.rango = localStorage.getItem('rango')
  }

}
