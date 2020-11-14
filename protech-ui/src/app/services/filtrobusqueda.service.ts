import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FiltrobusquedaService {

  URL = "https://api-protech.herokuapp.com/api/producto/";

  constructor(private _httpClient:HttpClient) { }


  getResultadoBusqueda(busqueda){
    return this._httpClient.get(`${this.URL}?buscar=${busqueda}`);
  }
}
