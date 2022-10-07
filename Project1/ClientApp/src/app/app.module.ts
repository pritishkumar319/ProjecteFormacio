import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { LlistaIncidenciesComponent } from './llista-incidencies/llista-incidencies.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterIncidenciesPipe } from './filter-incidencies.pipe';
import { TranslationService } from './translation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Primerng Ccmponents
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddIncidenciaComponent } from './add-incidencia/add-incidencia.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { OrderListModule } from 'primeng/orderlist';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InfoIncidenciaComponent } from './info-incidencia/info-incidencia.component';
import { AvatarModule } from 'primeng/avatar';
import { InplaceModule } from 'primeng/inplace';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    IncidenciaComponent,
    LlistaIncidenciesComponent,
    AddIncidenciaComponent,
    FilterIncidenciesPipe,
    InfoIncidenciaComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    TableModule,
    TagModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ChipsModule,
    InputTextModule,
    FileUploadModule,
    DragDropModule,
    OrderListModule,
    AvatarModule,
    DropdownModule,
    MessageModule,
    InplaceModule,
    KeyFilterModule,
    ContextMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationService,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
      { path: 'counter', canActivate: [AuthGuard], component: CounterComponent },
      { path: 'fetch-data', canActivate: [AuthGuard], component: FetchDataComponent },
      { path: 'incidencies', canActivate: [AuthGuard], component: LlistaIncidenciesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "https://localhost:44354/api/pritishTraduccions/", "");
}*/
