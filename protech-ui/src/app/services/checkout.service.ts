import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { 
    console.log("servicio checkout listo");
  }

  ResetReserva(id,cantidad){
    let body={ tipo:"reset",cant:cantidad};
    console.log(body);
    return this.http.put('https://api-protech.herokuapp.com/api/producto/update/'+id, body);
  }

  getproducto(id: number){
    String(id);
    return this.http.get(`https://api-protech.herokuapp.com/api/producto/${id}`);
  }

  PostFactura(factura: any){
    console.log(factura);
    return this.http.post('https://api-protech.herokuapp.com/api/factura/', factura);
  }
}
