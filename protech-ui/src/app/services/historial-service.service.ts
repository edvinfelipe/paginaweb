import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {

  UsuarioActual: any;

  constructor(private HttpClient: HttpClient) {
    console.log("Servicio de historial disponible");
  }

  ExistUsuario(): boolean {
    if (sessionStorage.length == 0 ) {
      console.log("usuario no existe");
      return false;
    }
    if (sessionStorage.length != 0) {
      console.log("usuario existe");
      return true;
    }
  }
  
  GetUsuarioActual(){
    let ua = JSON.parse(sessionStorage.getItem("user"));
    console.log(ua._id);
    return this.UsuarioActual = ua._id;
  }
}
