import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { debounceTime } from "rxjs/operators";
import { Store } from "@ngrx/store"


import { CategoriasService } from "../../../services/categorias.service";
import { LoginComponent } from "../../login/login.component";
import { RegistroComponent } from "../../registro/registro.component";
import { LoginService } from "../../../services/login.service";
import { FiltrobusquedaService } from "../../../services/filtrobusqueda.service";
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { CarritoStore } from "../../../redux/carrito.reducers"
import { IniciarAction } from "../../../redux/carrito.actions";
import { CarritoUsuarioService } from "../../../services/carrito-usuario.service";

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
  usuario;
  contador;
  constructor(private _cateogiriasService:CategoriasService,private _filtroBusqueda:FiltrobusquedaService,private modalService: NgbModal, private _loginService: LoginService,
              private Router: Router, private store:Store<CarritoStore>, private carritoService: CarritoUsuarioService) {

    this.getCategorias();
    this.iniciarCarrito();
    this.suscribitCarrito();
    this.emailCtrl.valueChanges
    .pipe(debounceTime(350))
    .subscribe(value=>{
      if(value!=""){
        this.buscando=true;
        this.getProductos(value);
      }else{
        this.buscando=false;
      }
    });
  }

  getCategorias(){

    this._cateogiriasService.getCategorias()
    .subscribe( (dataCategorias: any) => {
      this.categorias = dataCategorias;
    });
  }

  iniciarCarrito() {
    if(sessionStorage.getItem('user')){
      let usuario = JSON.parse(sessionStorage.getItem('user'));
      this.carritoService.getItemCountItems(usuario._id).subscribe((data:any)=>{
        let cantidad = data['carrito'];
        const carrito = new IniciarAction(cantidad);
        this.store.dispatch(carrito);
      });
    } else {
      let cantidad;

      if(localStorage.getItem('venta')){
        cantidad = JSON.parse(localStorage.getItem('venta')).length;
      }else {
        cantidad=0;
      }
      const carrito = new IniciarAction(cantidad);
        this.store.dispatch(carrito);
    }
  }

  suscribitCarrito() {
    this.store.select('contador').subscribe(state =>{
      this.contador = state;
    });
  }

  HistorialLocation() {
    this.Router.navigate(['historialcompras']);
  }

  detalleProducto(idProducto){
    this.buscando=false;
    this.Router.navigate(['detalle',idProducto]);
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
    }else{
      this.isLogged=true;
      this.usuario = JSON.parse(this._loginService.getUser());
    }
  }

  onLogOut(){
    this._loginService.logOut();
    location.reload();
  }
}
