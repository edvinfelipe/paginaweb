import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-recepcioncorreo',
  templateUrl: './recepcioncorreo.component.html',
  styleUrls: ['./recepcioncorreo.component.css']
})
export class RecepcioncorreoComponent implements OnInit {

  formCorreo: FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.buildFormCorreo();
  }

  ngOnInit(): void {
  }


  private buildFormCorreo(){
    this.formCorreo = this.formBuilder.group({
      correo:['',[Validators.email,Validators.required]]
    });
  }

  validarCorreo(){
    if(this.formCorreo.valid){
      console.log('Fomrulario valido');
    }else{
      this.formCorreo.markAllAsTouched();
    }
  }
}
