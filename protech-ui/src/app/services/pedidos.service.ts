import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  URL:string = "https://api-protech.herokuapp.com/api/";

  constructor(private _httpClient:HttpClient) {}

  getFacturas() {
    return this._httpClient.get(`${this.URL}factura/`);
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


}
