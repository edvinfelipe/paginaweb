import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalagoService {
  constructor(private http: HttpClient) {
    console.log("Constructor catalogo servicios");
   }

  /**
   * Funcion que concatenará todo el url para la realizar una petición GET
   * @param query Condición que se mandara por si se desea aplicar un filtro por marca/categoria
   * @param numPag Numero de paginación solicitado ya que se mostrarán de 10 en 10 los productos
   */
  getQuery( query: String, numPag = 1){
    const url = `https://api-protech.herokuapp.com/api/producto/${ query }?page=${ numPag }`;
    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmNTU0ZDhjODgzNzE1NWYyMTllOTM0YSIsImNvZF9lbXBsZWFkbyI6IkVNXzExIiwidXNlcm5hbWUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTU5OTYwMTUxNCwiZXhwIjoxNTk5Nzc0MzE0fQ.BI8FgxCGtpWpM6AE0XrDH-GUhdx5txMfnqfQlkVRf8Y'
    });
    
    console.log (url);
    return this.http.get(url, {headers})
      .pipe( map (data => data['productos']));
  }

  /**
   * Función que retornará el número de elementos encontrados según haya sido la búsqueda.
   */
  getPaginacion(){
    const url = 'https://api-protech.herokuapp.com/api/producto/';
    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmNTU0ZDhjODgzNzE1NWYyMTllOTM0YSIsImNvZF9lbXBsZWFkbyI6IkVNXzExIiwidXNlcm5hbWUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTU5OTYwMTUxNCwiZXhwIjoxNTk5Nzc0MzE0fQ.BI8FgxCGtpWpM6AE0XrDH-GUhdx5txMfnqfQlkVRf8Y'
    });
    return this.http.get(url, {headers})
      .pipe( map (data => data['count']));
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
