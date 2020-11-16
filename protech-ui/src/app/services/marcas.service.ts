import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  token = sessionStorage.getItem('accesToken');
  constructor(private http: HttpClient) { 
  }

  getMarcas(){
    return this.http.get('https://api-protech.herokuapp.com/api/marca/')
      .pipe( map( data => data['marcas']));

  }
  postMarca(nombre:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    console.log(body);
    return this.http.post('https://api-protech.herokuapp.com/api/marca/', body, {headers});
  }
  putMarca(nombre:any, id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    let body = {nombre: nombre};
    return this.http.put(`https://api-protech.herokuapp.com/api/marca/${ id }`, body, {headers});
  }
  deleteMarca(id:any){
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.delete(`https://api-protech.herokuapp.com/api/marca/${ id }`, {headers});
  }

}
