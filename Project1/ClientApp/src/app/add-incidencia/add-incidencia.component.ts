import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { DadesService } from '../dades.service';
import { Incidencia, IncidenciaGet } from '../Models/Incidencia';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.css']
})
export class AddIncidenciaComponent implements OnInit {

  bDisplay: boolean = false;
  bSubmitted = false;
  tags: string[] = [];
  sTitolHeader = "Afegir Incidencia"
  incidencia: Incidencia = new Incidencia();
  @Input() modifiedIncidencia = new IncidenciaGet();
  @Output() addItemEvent = new EventEmitter<IncidenciaGet>();
  clickEventSubscription: Subscription = new Subscription();
  @ViewChild("image") image: FileUpload;

  constructor(private dades : DadesService, public translate: TranslateService) { }
  // boolean per mostar el formulari d'agefir una incidencia
  ngOnInit(): void {

    this.clickEventSubscription = this.dades.getRightClickEvent().subscribe(() => {
      this.changeTitol();
      this.bSubmitted = false;
      this.image.clear();
      this.bDisplay = true;
      this.incidencia.sTitol = this.modifiedIncidencia.sTitol;
      this.incidencia.sDescripcio = this.modifiedIncidencia.sDescripcio;
      this.tags = this.modifiedIncidencia.sTags.split(",");
      this.incidencia.pImatge = this.modifiedIncidencia.pImatge;
    });
  }

  // Canviar titol del formular
  changeTitol() {
    if (this.modifiedIncidencia.sTitol != "") {
      this.translate.get("modify-incidencia").subscribe(res => {
        this.sTitolHeader = res;
      });
    }
    else {
      this.translate.get("add-incidencia").subscribe(res => {
        this.sTitolHeader = res;
      });
    }
  }
  // Mostrar el formulari per afegir una nova incidencia
  showDialog() {
    this.changeTitol();
    this.clearData();
    this.bDisplay = true;

  }
  // Funció per amagar el formulari de crear una incidencia
  hideDialog() {
    console.log(this.modifiedIncidencia);
    this.clearData();
    this.bDisplay = false;
  }
  // Funció per guarda una incidencia
  guardarIncidencia() {
    // Validem que el títol i la descripció no siguin NULL
    if (this.incidencia.sTitol !== "" && this.incidencia.sDescripcio !== "" && this.tags.length > 0) {
      if (this.modifiedIncidencia.sTitol === "") {
        this.incidencia.sEmailResponsable = this.dades.sEmailUsuari;
        this.incidencia.sTags = this.tags.toString();
        console.log(this.incidencia);
        this.dades.saveIncidencia(this.incidencia).subscribe({
          next: (res) => {
            this.incidencia = new Incidencia();
            this.addItemEvent.emit();
          },
          error: (e) => {
            console.log("error: ", e);
          },
          complete: () => {
            console.log("completed ");
          }
          });
      }
      else {
        this.modifiedIncidencia.sTitol = this.incidencia.sTitol;
        this.modifiedIncidencia.sDescripcio = this.incidencia.sDescripcio;
        this.modifiedIncidencia.sTags = this.tags.toString();
        this.modifiedIncidencia.pImatge = this.incidencia.pImatge;
        this.dades.updateIncidencia(this.modifiedIncidencia).subscribe(res => {
          this.modifiedIncidencia = new IncidenciaGet();
          this.addItemEvent.emit();

        });
      }
      this.clearData();
      this.bDisplay = false;
    }
    else {
      this.bSubmitted = true;

    }
  }
  // Funció per convertir l'imatge a base64
  onSelectEvent(event: any, image: FileUpload) {
    let reader = new FileReader();
    reader.readAsDataURL(event.files[0]);

    reader.onloadend = () =>{
      this.incidencia.pImatge = reader.result as string;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  // Funcio per nategar el formulari
  clearData() {
    this.incidencia = new Incidencia();
    this.modifiedIncidencia = new IncidenciaGet();
    this.tags = []
    this.bSubmitted = false;
    this.image.clear();
  }

}
