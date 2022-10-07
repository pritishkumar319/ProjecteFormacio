import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DadesService } from './dades.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public translate: TranslateService,public dades : DadesService) {
    this.translate.addLangs(['cat', 'es']);
    this.translate.setDefaultLang('cat');
  }
  title = 'app';
}
