import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common';

import { LoginService } from "../../services/login.service";
import { Login } from "../../interfaces/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loginData: Login;
  response: any = [];
  isErrorLoged:boolean=false;
  constructor(public activeModal: NgbActiveModal, private formBuilder:FormBuilder, private _loginService:LoginService,private location: Location) {
    this.buildFormLogin();
   }

  ngOnInit(): void {
  }

  private buildFormLogin() {
    this.formLogin = this.formBuilder.group({
      usuario: ['',[Validators.required]],
      contrasenia: ['',[Validators.required]]
    });
  }

  datos(){

    if(this.formLogin.valid ){
      const valor = this.formLogin.value;
      this.loginData = {
        username: this.formLogin.get('usuario').value,
        password: this.formLogin.get('contrasenia').value
      };
      this._loginService.inicioSesion(this.loginData).subscribe((data:any) =>{

        if( parseInt(data.status)==200){
          this.isErrorLoged=false;
          console.log(data.body['token']);
          console.log(data);
          this._loginService.setToken(data.body['token']);
          location.reload();
        }
      },
      error =>{
          this.isErrorLoged=true;
      }
      );

    }else{
      this.formLogin.markAllAsTouched();

    }

  }

}
