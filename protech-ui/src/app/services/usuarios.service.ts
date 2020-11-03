import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  UsuariosService {

      baseurl='https://api-protech.herokuapp.com/api/cliente/';
      baseurl2="https://api-protech.herokuapp.com/api/cliente/?role=ADMIN_ROLE"
      httpHeaders= new HttpHeaders({'Content-Type': 'application/json'});
      constructor(private http: HttpClient) { }

      
  Agregar(datos):Observable<any> {
    const evento={nombre:datos.nombre,direccion:" ",telefono:" ",correo:datos.correo,nit:" ",username:datos.username,password:datos.password,role:"ADMIN_ROLE"};
    console.log(evento);
    return this.http.post(this.baseurl,evento,{headers: this.httpHeaders});
  }
  getTODOSLOSDATOS(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjA0MzMxNDQ1LCJleHAiOjE2MDQ1MDQyNDV9.eC6MnS_wo8Fld0R8TdrK886CpLju1QlqmPgmJ8KyICY'
    },);
    return this.http.get(this.baseurl2,{headers});
  }

    }
  
  