import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string;
  rango: string;
  coins: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //console.log("service")
    this.userService.getUserInfo().subscribe(res => this.setPerfil(res))
  }

  openLogin() {
    window.open("https://login.lol-web.games/login?client_id=4ohv3cmaabbo91aduqpvg8o36j&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Flol-web.games",
      "_self");
  }

  openLogout() {
    localStorage.setItem('userName', null)
    localStorage.setItem('rango', null)
    localStorage.setItem('coins', null)
    localStorage.clear()
    window.open("https://login.lol-web.games/logout?client_id=4ohv3cmaabbo91aduqpvg8o36j&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Flol-web.games",
      "_self");
    localStorage.removeItem('userName')
    localStorage.removeItem('rango')
    localStorage.removeItem('coins')
    localStorage.clear()
    window.open("https://login.lol-web.games/",
      "_self");
  }

  setPerfil(res: any) {
    this.userName = res.username
    this.coins = res.coins
    this.rango = res.level
    localStorage.setItem('userName', this.userName)
    localStorage.setItem('rango', this.rango)
    localStorage.setItem('coins', this.coins.toString())
    localStorage.setItem('firstTime', "true")
  }

  logging() {

    // if (localStorage.getItem('userName')) {
    // return true;
    // }
    //this.userService.getUserInfo().subscribe(res => this.userName = res)
    //console.log(this.userName)
    //window.sessionStorage
    const location = window.location.href;
    return location.includes('id_token') || localStorage.getItem('sub');
    //return false;
  }

}
