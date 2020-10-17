import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Validaciones } from "../../registro/validaciones";

@Component({
  selector: 'app-nuevacontrasenia',
  templateUrl: './nuevacontrasenia.component.html',
  styleUrls: ['./nuevacontrasenia.component.css']
})
export class NuevacontraseniaComponent implements OnInit {

  formPassword: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.buildFormPassword();
  }

  ngOnInit(): void {
  }

  private buildFormPassword() {
    this.formPassword = this.formBuilder.group({
      contrasenia: ['',[Validators.required,
        Validators.minLength(8),
        Validaciones.patternValidator(/\d/,{hasNumber: true}),
        Validaciones.patternValidator(/[A-Z]/,{ hasCapitalCase: true}),
        Validaciones.patternValidator(/[a-z]/,{hasSmallCase: true}),
        Validaciones.patternValidator( /[ !@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/,{hasSpecialCharacters: true})
      ]],
      validarContrasenia:['',[Validators.required]]
    },{
      validator: Validaciones.passwordMatchValidator
    });
  }

  validarFormContrasenia(){
    if(this.formPassword.valid){
      console.log("Valido");
    }else{
      this.formPassword.markAllAsTouched();
    }
  }

}
