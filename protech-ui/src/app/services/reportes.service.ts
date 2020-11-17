import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  urlReporte = 'https://api-protech.herokuapp.com/api/factura/todos/';
  constructor(private httpClient: HttpClient) { }
  public getAll(): Observable<any> {
    return this.httpClient.get<any>(this.urlReporte);
  }

  public filtroFacturas(): Observable<any[]> {
    return this.getAll().pipe(map( data => data.facturas));
  }

  public twoDates( dateFrom: Date, dateTo: Date): Observable<any[]> {
    return this.filtroFacturas()
    .pipe(map( res => res.filter( val => new Date(val.fecha_venta) >= dateFrom && new Date(val.fecha_venta) <= dateTo)));
  }
}
