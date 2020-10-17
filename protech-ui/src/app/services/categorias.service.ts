import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjAyNjMxNzA0LCJleHAiOjE2MDI4MDQ1MDR9.YtG46ZNL2von4-gLP7q_vgtIw3dDAHz6f_Vme8wMEUU';

  constructor( private http: HttpClient) { }
  getCategorias(){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get('https://api-protech.herokuapp.com/api/categoria/', {headers})
      .pipe( map( data => data['categorias']));

  }
  postCategorias(nombre:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    console.log(body);
    return this.http.post('https://api-protech.herokuapp.com/api/categoria/', body, {headers});
  }
  putCategorias(nombre:any, id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    return this.http.put(`https://api-protech.herokuapp.com/api/categoria/${ id }`, body, {headers});
  }
  deleteCategorias(id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.delete(`https://api-protech.herokuapp.com/api/categoria/${ id }`, {headers});
  }
}
