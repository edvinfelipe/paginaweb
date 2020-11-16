import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjA1MjUyMTI4LCJleHAiOjE2MDU0MjQ5Mjh9.xVW-gce1gqQvqdlYscu-yUuof995eRk9Z4PeS7_0hAM';
  URL:string = "https://api-protech.herokuapp.com/api/";

  constructor(private _httpClient:HttpClient) {}

  getFacturas(noPagina=1) {
    return this._httpClient.get(`${this.URL}factura/?&page=${noPagina}`);
  }

  getDetallesFactura(idFactura:string) {
    return this._httpClient.get(`${this.URL}detalle_factura/${idFactura}`);
  }

  getPedido(idFactura:string){
    return this._httpClient.get(`${this.URL}factura/detenvio/${idFactura}`);
  }

  getRangoFechas(fromDate,toDate, noPagina=1){
    return this._httpClient.get(`${this.URL}factura/fecha/?fecha_inicial=${fromDate}&fecha_final=${toDate}&page=${noPagina}`);
  }

  putEstadoEntrega(estado,idDetalleEnvio) {
    let body = JSON.stringify(estado);
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.token

    });

    return this._httpClient.put(`${this.URL}detalleenvio/${idDetalleEnvio}`,body,{headers:headers});
  }

}
