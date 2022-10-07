import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css']
})
export class IncidenciaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
 /*   this.http.get<any>("https://localhost:44354/api/incidencies").subscribe(res => {
      console.log(res);
    });*/

}

  }
