import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { Validaciones } from "../registro/validaciones";
import { Correo } from "../../interfaces/correo";
import { EnviarcorreoService } from "../../services/enviarcorreo.service";

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactpageComponent implements OnInit {

  formContacto: FormGroup;
  correo:Correo;
  constructor(private formBuilder:FormBuilder, private _enviarCorreoService:EnviarcorreoService,private _toastr: ToastrService) {
    this.buildFormContacto();
  }

  ngOnInit(): void {
  }

  private buildFormContacto(){
    this.formContacto = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      telefono: ['',[Validators.required,Validaciones.patternValidator(/\d/,{hasNumber: true})]],
      correo: ['',[Validators.required,Validators.email]],
      mensaje: ['',Validators.required]
    });
  }

  enviarCorreo(){
    console.log("Entro");
    if(this.formContacto.valid){
      console.log("Valido");
      this.cuerpoCorreo();
      this._enviarCorreoService.enviarCorreo(this.correo).subscribe((data:any)=>{
        if(data.status==true){
          this.formContacto.reset();
          this._toastr.success("Mensaje Enviado","Pro-Tech");
        }
      });
    }else{
      this.formContacto.markAllAsTouched();
    }
  }

  private cuerpoCorreo() {
    this.correo = {
      correo: this.formContacto.get('correo').value,
      nombre: this.formContacto.get('nombre').value,
      telefono: this.formContacto.get('telefono').value,
      comentario: this.formContacto.get('mensaje').value
    };
  }
}
