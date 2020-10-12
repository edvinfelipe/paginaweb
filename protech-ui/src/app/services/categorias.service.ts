import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor( private http: HttpClient) { }
  getCategorias(){
    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmNTU0ZDhjODgzNzE1NWYyMTllOTM0YSIsImNvZF9lbXBsZWFkbyI6IkVNXzExIiwidXNlcm5hbWUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTU5OTYwMTUxNCwiZXhwIjoxNTk5Nzc0MzE0fQ.BI8FgxCGtpWpM6AE0XrDH-GUhdx5txMfnqfQlkVRf8Y'
    });

    return this.http.get('https://api-protech.herokuapp.com/api/categoria/', {headers})
      .pipe( map( data => data['categorias']));

  }
}
