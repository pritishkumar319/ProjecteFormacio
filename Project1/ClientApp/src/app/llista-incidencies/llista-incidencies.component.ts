import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';
import { DadesService } from '../dades.service';
import { IncidenciaGet } from '../Models/Incidencia';
import { min, orderBy } from 'lodash'
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Comentari } from '../Models/Comentari';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem, FilterService, FilterMatchMode } from 'primeng/api';
import { Responsable } from '../Models/Responsable';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-llista-incidencies',
  templateUrl: './llista-incidencies.component.html',
  styleUrls: ['./llista-incidencies.component.css']
})
export class LlistaIncidenciesComponent implements OnInit {

  items: any = [];
  responsables: Responsable[] = [];
  mIncidencia: IncidenciaGet = new IncidenciaGet();
  infoIncidencia: IncidenciaGet = new IncidenciaGet();
  @ViewChild("cm") cm!: ContextMenu;
  draggedIncidencia: IncidenciaGet = new IncidenciaGet();
  llistaToDo: IncidenciaGet[] = [];
  llistaSolving: IncidenciaGet[] = [];
  llistaChecking: IncidenciaGet[] = [];
  llistaSolved: IncidenciaGet[] = [];
  llistaDeleted: IncidenciaGet[] = [];


  todoResponsable: Responsable = new Responsable();
  SolvingInput: Responsable = new Responsable();
  CheckingInput: Responsable = new Responsable();
  SolvedInput: Responsable = new Responsable();
  DeletedInput: Responsable = new Responsable();


  comments: Comentari[] = [];

  constructor(
    public dades: DadesService,
    public translate: TranslateService,
    public filterService: FilterService){ }

  ngOnInit(): void {
      this.items = [
      { label: 'Editar', icon: 'pi pi-fw pi-pencil', command: () => this.modificarIncidencia() },
      { label: 'Eliminar', icon: 'pi pi-fw pi-trash', command: () => this.eliminarIncidencia() },
      {
        label: 'OrderBy',
        items: [
          {label: 'Nom', icon: 'pi pi-fw pi-trash', command: () => this.OrderBy("sTitol")},
          { label: 'Data de creació', icon: 'pi pi-fw pi-trash', command: () => this.OrderBy("dDataCreacio") }
          ]
      }
    ];

    this.getIncidents();
    this.dades.getResponsables().subscribe(res => {
      this.responsables = res;
    });

  }

  getIncidents() {
    this.llistaToDo = [];
    this.llistaSolving = [];
    this.llistaChecking = [];
    this.llistaSolved = [];
    this.llistaDeleted = [];
    // Obtenim totes les incidencies
    this.dades.getIncidencies().subscribe(res => {
      this.dades.incidencies = res;
      this.dades.incidencies.filter((item) => {
        this.arrangeIncidencies(item);
      });
    });
  }
  // Arrange incidents according to thier state
  arrangeIncidencies(item) {
    switch (item.sEstat) {
      case "todo": {
        this.llistaToDo.push(item);
        break;
      }
      case "solving": {
        this.llistaSolving.push(item);
        break;
      } case "checking": {
        this.llistaChecking.push(item);
        break;
      } case "solved": {
        this.llistaSolved.push(item);
        break;
      } case "deleted": {
        this.llistaDeleted.push(item);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  OrderBy(columna : string) {

    switch (this.mIncidencia.sEstat) {
      case "todo": {
        this.llistaToDo = orderBy(this.llistaToDo, columna);
        break;
      }
      case "solving": {
        this.llistaSolving = orderBy(this.llistaSolving, columna);
        console.log(this.llistaSolving);
        break;
      } case "checking": {
        this.llistaChecking = orderBy(this.llistaChecking, columna);
        break;
      } case "solved": {
        this.llistaSolved = orderBy(this.llistaSolved, columna);
        break;
      } case "deleted": {
        this.llistaDeleted = orderBy(this.llistaDeleted, columna);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

    eliminarIncidencia() {
      this.dades.deleteIncidencia(this.mIncidencia.nID).subscribe(res => {
        console.log(res);
      });
      let draggedProductIndex = -1; 
      console.log(draggedProductIndex);
      switch (this.mIncidencia.sEstat) {
        case "todo": {
          draggedProductIndex = this.llistaToDo.findIndex(ind => ind.nID == this.mIncidencia.nID);
          this.llistaToDo.splice(draggedProductIndex, 1);
          this.llistaToDo = [...this.llistaToDo];
          break;
        }
        case "solving": {
          draggedProductIndex = this.llistaSolving.findIndex(ind => ind.nID == this.mIncidencia.nID);
          this.llistaSolving.splice(draggedProductIndex, 1);
          this.llistaSolving = [...this.llistaSolving];
          break
      } case "checking": {
          draggedProductIndex = this.llistaChecking.findIndex(ind => ind.nID == this.mIncidencia.nID);
          this.llistaChecking.splice(draggedProductIndex, 1);
          this.llistaChecking = [...this.llistaChecking];
          break;
      } case "solved": {
          draggedProductIndex = this.llistaSolved.findIndex(ind => ind.nID == this.mIncidencia.nID);
          this.llistaSolved.splice(draggedProductIndex, 1);
          this.llistaSolved = [...this.llistaSolved];
          break;
      } case "deleted": {
          draggedProductIndex = this.llistaDeleted.findIndex(ind => ind.nID == this.mIncidencia.nID);
          this.llistaDeleted.splice(draggedProductIndex, 1);
          this.llistaDeleted = [...this.llistaDeleted];
          break;
        }
        default: {
          //statements; 
          break;
        }
      }
      
  }

    modificarIncidencia() {
      // Cridem la funció per mostar el formulari de modificar la incidencia
      this.dades.sendModifyClickEvent();
    }
  // Funcio DROP per canviar l'estat d'una incidencia
  drop(event: CdkDragDrop<IncidenciaGet[]>) {
    let id: number = parseInt(event.item.element.nativeElement.id);
    let draggedProductIndex = this.dades.incidencies.findIndex(ind => ind.nID == id);
    this.dades.incidencies[draggedProductIndex].sEstat = event.container.id;
    this.dades.incidencies = [...this.dades.incidencies];
    this.changeEstat(event.previousContainer.id, event.container.id, parseInt(event.item.element.nativeElement.id));
    // Actualitzar l'estat a la BBDD
    this.dades.updateIncidencia(this.dades.incidencies[draggedProductIndex]).subscribe(res => {
      console.log("Estat Updated");
    });
  }
  onRightClick(event: any, inci: IncidenciaGet) {
    event.preventDefault();
    if (inci != null) {
      if (!this.cm.containerViewChild.nativeElement.style.display ||
        this.cm.containerViewChild.nativeElement.style.display == 'none') {
        //Open contextual menu
        setTimeout(() => {
          this.cm.position(event);
          this.cm.containerViewChild.nativeElement.style.display = 'block';
          this.cm.containerViewChild.nativeElement.style.visiblility = 'visible';
          this.mIncidencia = inci;
        }, 0);
      } else {
        //close contextual menu
        setTimeout(() => {
          this.cm.containerViewChild.nativeElement.style.display = 'none';
        }, 0);
      }
    }
  }

  onClick(inci: IncidenciaGet) {
    this.dades.getComentaris(inci.nID).subscribe(res => {
      this.comments = res;
      this.infoIncidencia = inci;
      this.dades.sendClickEvent();
    });
  }
  // Afegir incidencia a la llista TODO
  addIncidencia() {

    this.getIncidents();
  }

  onChange(event :any, estat:string) {
    switch (estat) {
      case "todo": {
        this.todoResponsable = event.value;
        break;
      }
      case "solving": {
        this.SolvingInput = event.value;
        break;
      } case "checking": {
        this.CheckingInput = event.value;
        break;
      } case "solved": {
        this.SolvedInput = event.value;
        break;
      } case "deleted": {
        this.DeletedInput = event.value;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  changeEstat(preEstat: string, newEstat, elementID: number) {

    let draggedProductIndex = -1;
    switch (preEstat) {
      case "todo": {
        draggedProductIndex = this.llistaToDo.findIndex(ind => ind.nID == elementID);
        this.llistaToDo.splice(draggedProductIndex, 1);
        this.llistaToDo = [...this.llistaToDo];
        break;
      }
      case "solving": {
        draggedProductIndex = this.llistaSolving.findIndex(ind => ind.nID == elementID);
        this.llistaSolving.splice(draggedProductIndex, 1);
        this.llistaSolving = [...this.llistaSolving];
        break
      } case "checking": {
        draggedProductIndex = this.llistaChecking.findIndex(ind => ind.nID == elementID);
        this.llistaChecking.splice(draggedProductIndex, 1);
        this.llistaChecking = [...this.llistaChecking];
        break;
      } case "solved": {
        draggedProductIndex = this.llistaSolved.findIndex(ind => ind.nID == elementID);
        this.llistaSolved.splice(draggedProductIndex, 1);
        this.llistaSolved = [...this.llistaSolved];
        break;
      } case "deleted": {
        draggedProductIndex = this.llistaDeleted.findIndex(ind => ind.nID == elementID);
        this.llistaDeleted.splice(draggedProductIndex, 1);
        this.llistaDeleted = [...this.llistaDeleted];
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
    let inci = this.dades.incidencies.find(ind => ind.nID == elementID);
    console.log(inci);
    switch (newEstat) {
      case "todo": {
        this.llistaToDo.push(inci);
        this.llistaToDo = [...this.llistaToDo];
        break;
      }
      case "solving": {
        this.llistaSolving.push(inci);
        this.llistaSolving = [...this.llistaSolving];
        break;
      } case "checking": {
        this.llistaChecking.push(inci);
        this.llistaChecking = [...this.llistaChecking];
        break;
      } case "solved": {
        this.llistaSolved.push(inci);
        this.llistaSolved = [...this.llistaSolved];
        break;
      } case "deleted": {
        this.llistaDeleted.push(inci);
        this.llistaDeleted = [...this.llistaDeleted];
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }






}
