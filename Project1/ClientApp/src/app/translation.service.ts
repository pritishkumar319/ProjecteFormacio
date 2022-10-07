import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements TranslateLoader{

  constructor(private http: HttpClient) { }
  // Metode per obtenir les traduccions
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`https://localhost:44354/api/pritishTraduccions/${lang}`)
      .pipe(map((response: any) => {
        const arr = Array.from(response, function (item: any) {
          let data = Object.values(item);
          let key : string = [data[0]].toString();
          let o = Object();
          o[key] = data[1];
          return o;
        });
        var obj = [arr.reduce((acc, cur) => ({ ...acc, ...cur }), {})]
        return obj[0]
      }));
  }
}
