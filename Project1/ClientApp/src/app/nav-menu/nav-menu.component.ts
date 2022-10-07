import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { DadesService } from '../dades.service';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  idiomes: Idioma[] = [];
  constructor(public translate: TranslateService, public dades: DadesService, private router: Router) {
    this.idiomes = [
      { nom: 'Català', value:"cat", icon: 'es' },
      { nom: 'Español', value: "es", icon: 'RM' },
    ];

  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  onChange(event: Dropdown) {
    this.translate.use(event.value);
  }
  logOut() {
    this.dades.bLogin = false;
    this.router.navigate(['/login']);
  }
}
export class Idioma {
  nom: String = "";
  value: String  = ""
  icon: String = "";
}
