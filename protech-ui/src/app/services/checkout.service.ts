import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjAyNjMxNzA0LCJleHAiOjE2MDI4MDQ1MDR9.YtG46ZNL2von4-gLP7q_vgtIw3dDAHz6f_Vme8wMEUU';


  constructor(private http: HttpClient) { 
    console.log("servicio checkout listo");
  }
  getfechaformato(){
    let date = new Date();
    let fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ;
    return fecha;
  }
  gethoraformato(){
    let date = new Date();
    let horas = date.getHours(); let minutos = date.getMinutes(); let segundos = date.getSeconds();
    
    let h; let m; let s;
    if (horas <10) {
      h = '0' +horas;
    }else{
      h = horas;
    }
    if (minutos <10) {
      m = '0' +minutos;
    }else{
      m = minutos;
    }
    if (segundos <10) {
      s = '0' +segundos;
    }else{
      s = segundos;
    }
    let horafactura = h+":"+m+":"+s;
    return horafactura;
  }

  getproducto(id: number){
    String(id);
    return this.http.get(`https://api-protech.herokuapp.com/api/producto/${id}`);
  }

  postfacturaconcliente(total: number, cliente: String ){
    let fecha = this.getfechaformato();
    let horafactura = this.gethoraformato();

    let fechayhorafactura = fecha + 'T'+ horafactura;    
    let body = {total: total, fecha_venta: fechayhorafactura, cliente_factura:cliente}

    return this.http.post('https://api-protech.herokuapp.com/api/factura/', body);
  }

  postfacturasincliente(total: number ){

    let fecha = this.getfechaformato();
    let horafactura = this.gethoraformato();

    let fechayhorafactura = fecha + 'T'+ horafactura;    
    let body = {total: total, fecha_venta: fechayhorafactura}

    return this.http.post('https://api-protech.herokuapp.com/api/factura/', body);

  }
}
