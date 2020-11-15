import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Registro } from "../interfaces/registro";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjA1MjUyMTI4LCJleHAiOjE2MDU0MjQ5Mjh9.xVW-gce1gqQvqdlYscu-yUuof995eRk9Z4PeS7_0hAM';
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
