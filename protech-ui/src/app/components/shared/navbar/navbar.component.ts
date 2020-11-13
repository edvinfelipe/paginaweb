import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { debounceTime } from "rxjs/operators";

import { CategoriasService } from "../../../services/categorias.service";
import { LoginComponent } from "../../login/login.component";
import { RegistroComponent } from "../../registro/registro.component";
import { LoginService } from "../../../services/login.service";
import { FiltrobusquedaService } from "../../../services/filtrobusqueda.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias: any[] = [];
  isLogged:boolean = false;
  emailCtrl = new FormControl('',[]);
  productos:any[] = [];
  buscando:boolean=false;
  constructor(private _cateogiriasService:CategoriasService,private _filtroBusqueda:FiltrobusquedaService,private modalService: NgbModal, private _loginService: LoginService,
              private Router: Router) {

    this.getCategorias();

    this.emailCtrl.valueChanges
    .pipe(debounceTime(350))
    .subscribe(value=>{
      if(value!=""){
        this.buscando=true;
        this.getProductos(value);
      }else{
        this.buscando=false;
      }
    })
  }

  getCategorias(){

    this._cateogiriasService.getCategorias()
    .subscribe( (dataCategorias: any) => {
      this.categorias = dataCategorias;
    });
  }

  HistorialLocation() {
    this.Router.navigate(['historialcompras']);
  }

  getProductos(producto){
    this._filtroBusqueda.getResultadoBusqueda(producto).subscribe((data:any)=>{
      this.productos =  data['productos'];
    });
  }

  ngOnInit(): void {
    this.onCheckUser();
  }

  openInicioSesion() {
    const modalRef = this.modalService.open(LoginComponent);

  }

  openRegistro(){
    const modalRef = this.modalService.open(RegistroComponent);
  }

  onCheckUser(){
    if(this._loginService.getToken() ===null){
      this.isLogged=false;
      console.log(this.isLogged);
    }else{
      this.isLogged=true;
      console.log(this.isLogged);
    }
  }

  onLogOut(){
    this._loginService.logOut();
    location.reload();
  }
}
