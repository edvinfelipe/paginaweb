import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Correo } from "../interfaces/correo";

@Injectable({
  providedIn: 'root'
})
export class EnviarcorreoService {

  URL='https://api-protech.herokuapp.com/api/contacto/email/';
  constructor(private httpClient:HttpClient ) { }

  enviarCorreo(correo:Correo) {
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let body = JSON.stringify(correo);
    return this.httpClient.post(this.URL,body,{headers:headers});
  }
}
