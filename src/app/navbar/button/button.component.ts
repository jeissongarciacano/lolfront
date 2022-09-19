import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  userName: any;
  coins: any;
  level: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userName= localStorage.getItem('userName')
    this.coins = localStorage.getItem('coins')
    this.level = localStorage.getItem('rango')
    this.route.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({
          access_token: params.get('access_token'),
          id_token: params.get('id_token'),
          error: params.get('error'),
        }))
      )
      .subscribe(res => this.getPerfil(res.access_token, res.id_token));

  }


  getPerfil(accesToken: string, idToken: string): void {
    //console.log("accesToken", accesToken)
    //console.log("idToken", idToken)
     //console.log(decode.sub)
    //this.userName = decode.email;
    if (accesToken!=null && idToken!=null) {
      console.log("info")
      const decode: any = jwt_decode(idToken);
      this.saveLocalStorage(accesToken, idToken, decode.sub);
    }
  }

  saveLocalStorage(accesToken: string, idToken: string, sub: string) {
    localStorage.setItem("accesToken", accesToken);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem('sub', sub)
    
    //console.log(localStorage.getItem('accesToken'))
  }

}
