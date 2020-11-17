import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Productos } from "../interfaces/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  header = sessionStorage.getItem('accesToken');
  url = 'https://api-protech.herokuapp.com/api/producto/';
  bodyProducto: Productos;
  constructor(private http: HttpClient) { }
  //campos: any
  //campos[0] = producto
  //campos[1] = descripcion
  //campos[2] = marca
  //campos[3] = categoría
  //campos[4] = precio de venta
  //campos[5] = existencia
  //campos[6] = % descuento

  //descuento: any
  //false = no hay descuento
  //true = hay descuento

  //disponible: any
  //banderaradio = 1 (disponible)
  //banderaradio = 2 (descontinuado)

  postProducto(campos: string[], disponible: any, descuento: any, especificacion: any, mid: any, cid: any){
    const headers = new HttpHeaders({
      'Authorization': this.header,
      'Content-Type':'application/json'
    });
    this.bodyProducto = {
      descripcion: campos[1],
      garantia: 'No dispone',
      ofertado: descuento,
      porcenjateOferta: parseInt(campos[6]),
      nombre: campos[0],
      precio: parseFloat(campos[4]),
      existencia: parseInt(campos[5]),
      especificacion: especificacion,
      disponible: true,
      marca: mid,
      categoria: cid
    };
    console.log(this.bodyProducto.descripcion);
    if (disponible === 2)
    {
      this.bodyProducto.disponible = false;
    }
    let body = JSON.stringify(this.bodyProducto);
    return this.http.post(this.url, body, {headers});
  }

  putProducto(id: any, campos: string[], disponible: any, descuento: any, especificacion: any, mid: any, cid: any)
  {
    const headers = new HttpHeaders({
      'Authorization': this.header,
      'Content-Type':'application/json'
    });
    this.bodyProducto = {
      descripcion: campos[1],
      garantia: 'No dispone',
      ofertado: descuento,
      porcenjateOferta: parseInt(campos[6]),
      nombre: campos[0],
      precio: parseFloat(campos[4]),
      existencia: parseInt(campos[5]),
      especificacion: especificacion,
      disponible: true,
      marca: mid,
      categoria: cid
    };
    if (disponible === 2)
    {
      this.bodyProducto.disponible = false;
    }
    let body = JSON.stringify(this.bodyProducto);
    return this.http.put(this.url + id, body, {headers});
  }

  deleteProducto(id: any)
  {
    const headers = new HttpHeaders({
      'Authorization': this.header,
      'Content-Type':'application/json'
    });

    return this.http.delete(this.url + id, {headers});
  }
}
