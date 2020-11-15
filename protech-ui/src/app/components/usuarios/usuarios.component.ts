import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroService } from 'src/app/services/registro.service';
import { ToastrService } from 'ngx-toastr';
import { Validaciones } from './validaciones';
import { MensajeErrorComponent } from '../shared/mensaje-error/mensaje-error.component';
declare var $ : any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  formCredenciales: FormGroup;
  dataUsuario: any;
  users: any[] = [];
  pages: any[] = [];
  newUser: any;
  pageCount: any;
  page = 1;
  idUser: any;
  idU: any;
  modalBool: false;
  

  constructor(
    private formBuilder: FormBuilder,
    private _registro: RegistroService,
    private toastr: ToastrService,
    private modalService: NgbModal) { 
    this.buildFormCredenciales();
    this.getUsers();
    this.getPages();
  }

  ngOnInit(): void {
  }
  private buildFormCredenciales(): void{
    this.formCredenciales = this.formBuilder.group({
      nombre: ['', Validators.required],
      nick: ['',Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['',[Validators.required,
        Validators.minLength(8),
        Validaciones.patternValidator(/\d/,{hasNumber: true}),
        Validaciones.patternValidator(/[A-Z]/,{ hasCapitalCase: true}),
        Validaciones.patternValidator(/[a-z]/,{hasSmallCase: true}),
        Validaciones.patternValidator( /[ !@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/,{hasSpecialCharacters: true})
      ]],
      validarContrasenia: ['',Validators.required],
    },{
      validator:Validaciones.passwordMatchValidator
    });
  }
  validarDatos(): boolean{

    if(this.formCredenciales.valid){

      this.dataUsuario = {
        nombre: this.formCredenciales.get('nombre').value,
        direccion: '',
        telefono: '',
        correo: this.formCredenciales.get('correo').value,
        nit: '',
        username: this.formCredenciales.get('nick').value,
        password: this.formCredenciales.get('contrasenia').value,
        role: 'ADMIN_ROLE'
      };
      return true;
    }else{
      this.formCredenciales.markAllAsTouched();
      return false;
    }

  }

  registrarUsuario(): void{
    if (this.validarDatos()){
      this._registro.registrarUsuario(this.dataUsuario).subscribe(data => {
        this.toastr.success("Registro Exitoso","Pro-tech");
        this.getUsers();
        this.limpiar();
        this.getPages();
      },
      error=>{
        this.modalService.open(MensajeErrorComponent);
      });
    }
  }
  limpiar(): void{
    (document.getElementById('formRegistro') as HTMLFormElement).reset();
  }
  getUsers(): void{
    this._registro.getUsuarios(this.page).subscribe((dataUsers: any) => {
      this.users = dataUsers;
    });
  }

  putUser(): void{
    const newName = (document.querySelector(`[id="user${ this.idU }"]`) as HTMLInputElement).value;
    for (let i=0; i < this.users.length; i++){
      if (this.users[i]._id === this.idUser){
        this.newUser = {
          nombre: newName
        }
        this._registro.putUsuario(this.newUser, this.idUser).subscribe(error => {
            this.getUsers();
          }
        );
        i = this.users.length;
      }
    }
  }

  delUser(): void{
    this._registro.deleteUsuario(this.idUser).subscribe(data => {
      this.getUsers();
    }, 
      error => {
        console.log(error as any);
      }
    );
  }

  msgValidation(idx): void{
    let newName = (document.querySelector(`[id="user${ idx }"]`) as HTMLInputElement).value;
    if(newName !== ''){
      $('#updUser').modal('show');
      this.setUser(idx);
    }
    else{
      this.toastr.error("No se ingresó nada.")
      this.setUser(idx);
    }
  }

  setUser(idx: any): void{
    this.idUser = this.users[idx]._id;
    this.idU = idx;
  }

  getPageSymbol(current: number) {
    return this.pages[current - 1];
  }

  getPages(): void{
    let users = 0;
    let cantPages = 0;
    this._registro.getPaginacion().subscribe( (data: any) => {
      users = data / 10;
      cantPages = Math.ceil(users);
      this.pageCount = data;
      for(let i = 0; i < cantPages; i ++){
        this.pages.push(i + 1);
      }
    });
  }

}
