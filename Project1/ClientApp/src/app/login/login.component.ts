import { state, trigger, style,animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DadesService } from '../dades.service';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  animations: [
    trigger('errorState', [
      state('none', style({
        opacity: 0,
        display: 'none'
      })),
      state('block', style({
        opacity: 1,
        display: 'block'
      })),
      transition('block => none', animate('400ms ease-in')),
      transition('none => block', animate('400ms ease-out'))
    ])
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  repassword: string = "";
  nom: string = "";
  cognoms: string = "";
  submitted: boolean = false;
  ccRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  createAccount = false;
  createOrLogin: string = "";

  private key = CryptoJS.enc.Utf8.parse(environment.EncryptKey);
  private iv = CryptoJS.enc.Utf8.parse(environment.EncryptIV);

  constructor(
    private dades: DadesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.translate.get("create-account").subscribe(res => {
      this.createOrLogin = res;
    });
  }
  onClick() {
    this.submitted = true;
    console.log(this.email, this.password);
    let body = {
      sEmail: this.email,
      sContrasenya: this.password
    }
    this.dades.login(body).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Service Message', detail: e.error });
      },
      complete: () => {
        console.log("complete: ");
        this.dades.bLogin = true;
        this.dades.sEmailUsuari = this.email;
        this.router.navigate(['/incidencies']);
      }
    });
  }

  crearCompte() {
    if (this.createAccount) {
      this.createAccount = false;
      this.translate.get("create-account").subscribe(res => {
        this.createOrLogin = res;
      });
    }
    else {
      this.createAccount = true;
      this.translate.get("login").subscribe(res => {
        this.createOrLogin = res;
      });
    }

  }
  guardarUsuari() {
    this.submitted = true;
    if (this.nom !== "" && this.cognoms !== "" && this.password !== "" && this.repassword !== "" && this.email !== "") {
      if (this.password === this.repassword) {
        let encriptedPassword = this.encryptUsingAES256(this.password);
        let body = {
          sEmail: this.email,
          sContrasenya: encriptedPassword,
          sNom: this.nom,
          sCognoms: this.cognoms
        }
        this.dades.register(body).subscribe({
          next: (res) => {
          },
          error: (e) => {
            console.log("error: ", e.error);
            this.messageService.clear();
            this.messageService.add({ severity: 'error', summary: 'Service Message', detail: e.error });
          },
          complete: () => {
            console.log("complete: ");
            this.dades.bLogin = true;
            this.dades.sEmailUsuari = this.email;
            this.router.navigate(['/incidencies']);
          }
        });
      }
      else {
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Password not Matching!' });
      }
    }
    else {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Service Message', detail: 'Please Fill all Fields!' });
    }

  }

  encryptUsingAES256(text): any {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
}
