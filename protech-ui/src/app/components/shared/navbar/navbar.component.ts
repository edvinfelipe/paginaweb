import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { debounceTime } from "rxjs/operators";
import { Store } from "@ngrx/store";


import { CategoriasService } from "../../../services/categorias.service";
import { LoginComponent } from "../../login/login.component";
import { RegistroComponent } from "../../registro/registro.component";
import { LoginService } from "../../../services/login.service";
import { FiltrobusquedaService } from "../../../services/filtrobusqueda.service";
import { FormControl } from '@angular/forms';
import { IniciarAction, IncrementarAction } from 'src/app/redux/carrito.actions';
import { CarritoUsuarioService } from "../../../services/carrito-usuario.service";
import { CarritoStore } from "../../../redux/carrito.reducers";


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
  contador:number;
  constructor(private _cateogiriasService:CategoriasService,private _filtroBusqueda:FiltrobusquedaService,private modalService: NgbModal, private _loginService: LoginService,
              private Router: Router, private store:Store<CarritoStore>, private _carritoService: CarritoUsuarioService) {


    this.getCategorias();
    this.getItemsCountCarrito();
    this.escuchaCarrito();
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

  escuchaCarrito() {
    this.store.select('contador').subscribe( state =>{
      this.contador = state;
      console.log("dsds",state);
      console.log("prueba");
    });
  }

  getItemsCountCarrito() {
    if(sessionStorage.getItem('user')){
      let user = JSON.parse(sessionStorage.getItem('user'));
      this._carritoService.getCarritoItemsCount(user._id).subscribe((data:any)=>{
        let cantidad = data['carrito'];
        const action = new IniciarAction(cantidad);
        this.store.dispatch(action);
      });

    } else {
      let cantidad;

      if(localStorage.getItem('venta')){
        cantidad = JSON.parse(localStorage.getItem('venta')).length;
      }else{
        cantidad=0;
      }
      const action = new IniciarAction(cantidad);
      this.store.dispatch(action);
    }
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
