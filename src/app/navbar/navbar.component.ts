import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string;
  rango: string;
  coins: number;

  res: any

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //console.log("service")
    //const location = window.location.href;
    this.route.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({
          access_token: params.get('access_token'),
          id_token: params.get('id_token'),
          error: params.get('error'),
        }))
      )
      .subscribe(res => {
        this.getPerfil(res.access_token, res.id_token)
      });

  }

  getPerfil(accesToken: string, idToken: string): void {
    //console.log("accesToken", accesToken)
    //console.log("idToken", idToken)
    //console.log(decode.sub)
    //this.userName = decode.email;
    localStorage.setItem("accesToken", accesToken);
    localStorage.setItem("idToken", idToken);
    if (accesToken != null && idToken != null) {
      //console.log("info")
      const decode: any = jwt_decode(idToken);
      localStorage.setItem('sub', decode.sub)
      //this.saveLocalStorage(accesToken, idToken, decode.sub);
      this.userService.getUserInfo(decode.sub).subscribe(res => this.setPerfil(res))
    }
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
    this.res = res;
    this.userName = res.username
    this.coins = res.coins
    this.rango = res.level
    localStorage.setItem('userName', this.userName)
    localStorage.setItem('rango', this.rango)
    localStorage.setItem('coins', this.coins.toString())
    localStorage.setItem('firstTime', "true")
  }

  logging() {
    const location = window.location.href;
    return location.includes('id_token') || localStorage.getItem('userName');
    //return false;
  }

}
