import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalagoService {
  private productos:Producto[]=[
    {
      nombre: "Pc",
      precio: 8000.00,
      descripcion: "Está medio arruinada",
      imagen: "assets/img/test/pc1.jpg"
    },
    {
      nombre: "AMD Ryzen 2700",
      precio: 1600.00,
      descripcion: "Procesador chingón",
      imagen: "assets/img/test/ryzen.jpg"
    },
    {
      nombre: "Nvidia GTX 1070ti",
      precio: 3000.00,
      descripcion: "Tarjeta gráfica nvidia ichill gtx 1070ti",
      imagen: "assets/img/test/1070.png"
    },
    {
      nombre: "Case cougar MX330-G",
      precio: 900.00,
      descripcion: "Case con vidrio templado",
      imagen: "assets/img/test/cougar.jpg"
    },
    {
      nombre: "Tarjeta madre ASUS B-450",
      precio: 1000.00,
      descripcion: "Tarjeta madre en mal estado pero igual la vendo aunque no sirva xd",
      imagen: "assets/img/test/asus.jpg"
    },
    {
      nombre: "Pc",
      precio: 8000.00,
      descripcion: "Está medio arruinada",
      imagen: "assets/img/test/pc1.jpg"
    },
    {
      nombre: "AMD Ryzen 2700",
      precio: 1600.00,
      descripcion: "Procesador chingón",
      imagen: "assets/img/test/ryzen.jpg"
    },
    {
      nombre: "Nvidia GTX 1070ti",
      precio: 3000.00,
      descripcion: "Tarjeta gráfica nvidia ichill gtx 1070ti",
      imagen: "assets/img/test/1070.png"
    },
    {
      nombre: "Case cougar MX330-G",
      precio: 900.00,
      descripcion: "Case con vidrio templado",
      imagen: "assets/img/test/cougar.jpg"
    },
    {
      nombre: "Tarjeta madre ASUS B-450",
      precio: 1000.00,
      descripcion: "Tarjeta madre en mal estado pero igual la vendo aunque no sirva xd",
      imagen: "assets/img/test/asus.jpg"
    }
  ];
  constructor(private http: HttpClient) { }

  /**
   * Funcion que concatenará todo el url para la realizar una petición GET
   * @param query Condición que se mandara por si se desea aplicar un filtro por marca/categoria
   * @param numPag Numero de página solicitado ya que se muestran de 10 en 10
   */
  getQuery( query: String, numPag = 1){
    const url = `https://api-protech.herokuapp.com/api/producto/${ query }?page=${ numPag }`;
    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmNTU0ZDhjODgzNzE1NWYyMTllOTM0YSIsImNvZF9lbXBsZWFkbyI6IkVNXzExIiwidXNlcm5hbWUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTU5OTYwMTUxNCwiZXhwIjoxNTk5Nzc0MzE0fQ.BI8FgxCGtpWpM6AE0XrDH-GUhdx5txMfnqfQlkVRf8Y'
    });

    return this.http.get(url, {headers})
      .pipe( map (data => data['producto']));
  }
  
  /**
   * Función que filtrará los productos por marca o categoria dependiendo del id que reciba
   */
  getFilter( idFiltro: String, noPagina = 1 ){
    return this.getQuery( idFiltro+'/', noPagina);
  }

  /**
   * Función que devolverá 10 productos dependiendo de la paginación.
   */
  getProductos(noPagina = 1){
    return this.getQuery('', noPagina)
  }



}
export interface  Producto{
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
};

export interface  Marca{
  nombre: string;
};