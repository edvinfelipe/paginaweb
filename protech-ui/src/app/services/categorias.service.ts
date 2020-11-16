import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  token = sessionStorage.getItem('accesToken');
  constructor( private http: HttpClient) { }
  getCategorias(){
    return this.http.get('https://api-protech.herokuapp.com/api/categoria/')
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
