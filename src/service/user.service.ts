import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://api.lol-web.games';


  user_sub = '60303e3f-6315-4763-bd58-cbeed95a0d1f';
  id_token = 'eyJraWQiOiJWcjF0WEZvckdsa2ZTT3Z3bkNGRllaRmFiajk2bVRTUU91MDB0U1JXR1lZPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiMWctVTlwcFpzaGtmSV9rTHlpTG9aZyIsInN1YiI6IjYwMzAzZTNmLTYzMTUtNDc2My1iZDU4LWNiZWVkOTVhMGQxZiIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV8zeEo2VWdQWGtfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfM3hKNlVnUFhrIiwiY29nbml0bzp1c2VybmFtZSI6Ikdvb2dsZV8xMTE1MTE4NDgyNjQ0MTA1MzYyOTMiLCJub25jZSI6ImlmSmNDdktPMFAxZWUyWGxwYkF6dWljdlJSUm10ZGNxNEhTTkZ3NUhDTGV0cWtMRGoxRUFUVkFHdFhTaDJvUXN4SXJRV2RsRVBTSUlDNS0zcFZSUlNtTVpjcDd2allJSHdodGI1MnRLcHdELTB0S0RPaWp5d0t1d3pUREROWGgzNTlZcXRVNy1ZcUZvN1lhYWdQV0p5RVZCWk0xWXJhdFA0OTJxb2NsTlRHMCIsImF1ZCI6IjRvaHYzY21hYWJibzkxYWR1cXB2ZzhvMzZqIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMTExNTExODQ4MjY0NDEwNTM2MjkzIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY2MzE2MzEyMTc0NyJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NjMyMDcxOTIsImV4cCI6MTY2MzIxMDc5MiwiaWF0IjoxNjYzMjA3MTkyLCJqdGkiOiJmYzFhZWJlOC1iOTNjLTRmMjUtODMzMC1mNWUwMDlkYWQxYmIiLCJlbWFpbCI6ImppbWVuZXp5b3VsdmlzQGdtYWlsLmNvbSJ9.vFzaVyxw6bQhLQfxOMQJYpj2SIgPIKyxGqppLd5R35ZfTOjFtc_YFvre2Huqpmt8AWzFPNYy3u8sOg5AojtZMB0ZfOOvnNcwIPb9Zh0z5JA-UcPAB5ULtamf-3UpQFcAkNJOJLezhy7CPU2mgih_j_bj3QBoo00Sp1ch_kl7sNEtjVRByAQ4_FEETynGqotPrMXRmWXuRHyhDoXpbJqLfRwdSA8eJ2vbna3KcOP8jhYr0T90hx-w7mj971hv7saIaOrScJ3AqH3kHUTZO6c_KiuV9ZeCkDheNayABVZGmNFp9ivMLFG0GcQrZmjAmIzVHUEIy5YqObbzx94Ys75b5Q';

  constructor(
    private http: HttpClient
  ) {

  }

  getUserInfo() {
    return this.http.post(`${this.baseUrl}/get-user-info`, { sub: localStorage.getItem('sub') },
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      }
    )
  }

  configureSpells(champion: string, spell_principal: string, spell_secondary: string) {
    return this.http.post(`${this.baseUrl}/configure-spells`, {
      user: localStorage.getItem('sub'),
      champion: champion,
      spell_principal: spell_principal,
      spell_secondary: spell_secondary
    },
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      })
  }

  shopSkins(championName: string, skinName: string, price: number) {
    return this.http.post(`${this.baseUrl}/shop-skins`, {
      userid: localStorage.getItem('sub'),
      championName: championName,
      skinName: skinName,
      price: price
    },
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      })
  }

  getSkin() {
    return this.http
    .get(`${this.baseUrl}/skins?user=${localStorage.getItem('sub')}`,
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      }
    )
  }

  getSpell() {
    return this.http.get(`${this.baseUrl}/spells?user=${localStorage.getItem('sub')}`,
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      }
    )
  }

  getItems(champ: string) {
    return this.http.get(`${this.baseUrl}/items?user=${localStorage.getItem('sub')}&champion=${champ}`,
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      }
    )
  }

  configureItems(amumu: string, items: any) {
    return this.http.post(`${this.baseUrl}/configure-items`,
      {
        user: localStorage.getItem('sub'),
        champion: amumu,
        items: [
          items[0],
          items[1],
          items[2],
          items[3],
          items[4],
          items[5]
        ]
      },
      {
        headers: new HttpHeaders({
          'content-type': 'aplication/json',
          'Authorization': localStorage.getItem("idToken"),
        })
      })
  }


}
