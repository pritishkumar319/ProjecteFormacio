import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comentari } from './Models/Comentari';
import { Incidencia, IncidenciaGet } from './Models/Incidencia';
import { Responsable } from './Models/Responsable';

@Injectable({
  providedIn: 'root'
})
export class DadesService {
  // URL BASE de la nostra API
  URL_BASE: string = "https://localhost:44354/api/";
  // LLista de totes les incidencies
  public incidencies: IncidenciaGet[] = [];
  private subject: Subject<void> = new Subject<void>();
  // Per mostar la informació d'una incidencia
  private incidenciaInfo: Subject<void> = new Subject<void>();
  // Comprovar el Login
  bLogin: boolean = false;
  sEmailUsuari: string = "";

  public todoResponsable: Responsable = new Responsable;


  constructor(private _http: HttpClient) { }

  sendModifyClickEvent() {
    this.subject.next();
  }
  getRightClickEvent(): Observable<void> {
    return this.subject.asObservable();
  }

  sendClickEvent() {
    this.incidenciaInfo.next();
  }
  getClickEvent(): Observable<void> {
    return this.incidenciaInfo.asObservable();
  }

  // Aquest mètode retorn totes les incidencies
  public getIncidencies() {
    return this._http.get<IncidenciaGet[]>(this.URL_BASE + "pritishIncidencies");
  }
  // Aquest mètode serviex per guardar una incidencia a la BBDD
  public saveIncidencia(incidencia: Incidencia) {
    return this._http.post<IncidenciaGet>(this.URL_BASE + "pritishIncidencies", incidencia);
  }
  // Aquest mètode serviex per canviar l'estat d'una incidencia
  public updateIncidencia(incidencia: IncidenciaGet) {
    return this._http.put<IncidenciaGet>(this.URL_BASE + "pritishIncidencies/" + incidencia.nID , incidencia);
  }
  // Aquest mètode serviex per eliminar una incidencia
  public deleteIncidencia(id: number) {
    return this._http.delete(this.URL_BASE + "pritishIncidencies/" + id);
  }

  // Aquest mètode serviex per agefir un comentari a una incidencia
  public saveComentari(comentari: Comentari) {
    return this._http.post<Comentari>(this.URL_BASE + "pritishComentaris", comentari);
  }

  // Aquest mètode serviex per obtenir les comentaris a partir de la ID de cada incidencia
  public getComentaris(idIncidencia: number) {
    return this._http.get<Comentari[]>(this.URL_BASE + "pritishComentaris/Comentari/" + idIncidencia); 
  }

  // Aquest mètode és per fer el login
  public login(body) {
    return this._http.post(this.URL_BASE + "Responsables/login", body);
  }
  // Mètode per obtenir la llista dels responsables
  public getResponsables() {
    return this._http.get<Responsable[]>(this.URL_BASE + "Responsables");
  }
    // Mètode per registar un responsable
  public register(body) {
    return this._http.post<Responsable>(this.URL_BASE + "Responsables/register", body);
  }
}
