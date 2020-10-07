import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { Login } from "../interfaces/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL:string = "https://api-protech.herokuapp.com/api/login/";

  constructor(private http:HttpClient) { }

  inicioSesion(login:Login){
    let body = JSON.stringify(login);
    console.log(body);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.URL,body,{headers:headers,observe:'response'});
  }

  setToken(token){
    sessionStorage.setItem("accesToken",token);
  }

  getToken(){
    return localStorage.getItem("accesToken");
  }


}
