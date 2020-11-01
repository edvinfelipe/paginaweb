import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {

  constructor(private HttpClient: HttpClient) {
    console.log("Servicio de historial disponible")
   }
}
