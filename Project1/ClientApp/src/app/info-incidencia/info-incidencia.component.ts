import { Component, Input, OnInit } from '@angular/core';
import { Inplace } from 'primeng/inplace';
import { Subscription } from 'rxjs';
import { DadesService } from '../dades.service';
import { Comentari } from '../Models/Comentari';
import { IncidenciaGet } from '../Models/Incidencia';

@Component({
  selector: 'app-info-incidencia',
  templateUrl: './info-incidencia.component.html',
  styleUrls: ['./info-incidencia.component.css']
})
export class InfoIncidenciaComponent implements OnInit {

  bDisplay: boolean = false;
  sComentari: string = "";
  @Input() llistaComentaris: Comentari[] = [];
  tags: string[] = [];
  
  clickEventSubscription: Subscription = new Subscription();
  @Input() incidencia: IncidenciaGet = new IncidenciaGet();
  constructor(private dades: DadesService) { }

  ngOnInit(): void {
    this.clickEventSubscription = this.dades.getClickEvent().subscribe(() => {
      this.bDisplay = true;
      this.tags = this.incidencia.sTags.split(',');
      console.log(this.incidencia);
    });
  }
  addComment(inplace: Inplace) {
    let comment = new Comentari();
    comment.nCodiIncidencia = this.incidencia.nID;
    comment.sEmailUsuari = this.dades.sEmailUsuari;
    comment.sComentari = this.sComentari;
    this.dades.saveComentari(comment).subscribe(res => {
      console.log(res);
      this.sComentari = "";
      inplace.deactivate();
      this.llistaComentaris.push(res);
    });
  }
  close(inplace: Inplace) {
    this.sComentari = "";
    inplace.deactivate();
  }

}
