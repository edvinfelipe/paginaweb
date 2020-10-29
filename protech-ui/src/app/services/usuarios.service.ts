import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


export class  UsuariosService {
    constructor(private http: HttpClient) {
        /*console.log("Constructor, servicio de marcas")*/
      }
    
  Agregar(datos):Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmNTU0ZDhjODgzNzE1NWYyMTllOTM0YSIsImNvZF9lbXBsZWFkbyI6IkVNXzExIiwidXNlcm5hbWUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTU5OTYwMTUxNCwiZXhwIjoxNTk5Nzc0MzE0fQ.BI8FgxCGtpWpM6AE0XrDH-GUhdx5txMfnqfQlkVRf8Y'
    });
    const evento={cod_empleado:datos.codigo,username:datos.username,password:datos.password};
    console.log(evento);
    return this.http.post('https://api-protech.herokuapp.com/api/usuarios/', {headers})

  }

    }
  
  