import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Registro } from "../interfaces/registro";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  token = sessionStorage.getItem('accesToken');
  URL:string = "https://api-protech.herokuapp.com/api/cliente/";

  constructor(private http:HttpClient) { }

  registrarUsuario(registro:Registro){
    let body = JSON.stringify(registro);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(this.URL,body,{headers:headers});
  }

  getPaginacion(){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get(`https://api-protech.herokuapp.com/api/cliente/?page=1&role=ADMIN_ROLE`, {headers})
      .pipe( map( data => data['count']));
  }

  getUsuarios(page: any){
  
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get(`https://api-protech.herokuapp.com/api/cliente/?page=${ page }&role=ADMIN_ROLE`, {headers})
      .pipe( map( data => data['clientes']));

  }

  putUsuario(body: any, usuarioId: any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.put(`https://api-protech.herokuapp.com/api/cliente/${ usuarioId }`, body, {headers});
  }

  deleteUsuario(usuarioId:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.delete(`https://api-protech.herokuapp.com/api/cliente/${ usuarioId }`, {headers});
  }
}
