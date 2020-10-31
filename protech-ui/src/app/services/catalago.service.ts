import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalagoService {
  constructor(private http: HttpClient) {
    /* console.log('Constructor catalogo servicios'); */
   }

/**
 * Funcion que ejecutará el query que se le haya sido mandado
 * @param query Consulta que se desee realizar dependiendo de los parametros
 */
  getQuery( query: String){
    const url = `https://api-protech.herokuapp.com/api/producto/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmNTU0ZDhjODgzNzE1NWYyMTllOTM0YSIsImNvZF9lbXBsZWFkbyI6IkVNXzExIiwidXNlcm5hbWUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTU5OTYwMTUxNCwiZXhwIjoxNTk5Nzc0MzE0fQ.BI8FgxCGtpWpM6AE0XrDH-GUhdx5txMfnqfQlkVRf8Y'
    });
    return this.http.get(url, {headers})
      .pipe( map (data => {
        //console.log (url);
        return data;
      }));
  }

  /**
   * Función que filtrará los productos por marca o categoria dependiendo del id que reciba
   */
  getFiltros(  idCategoria: String, idMarca: String, noPagina = 1 ){
    return this.getQuery( "marca/"+ idCategoria + '/' + idMarca + `/?page=${ noPagina }`);
  }

  /**
   * Función que devolverá 10 productos dependiendo de la paginación.
   */
  getProductos(noPagina = 1){
    return this.getQuery(`?page=${ noPagina }`)
  }

  /**
   * Función que retornará un único producto asociado a idProducto
   * @param idProducto id del producto a buscar
   */
  getProducto(idProducto:String){
    return this.getQuery(`${idProducto}`)
  }
  
  getProductos2(idCategoria = '', idMarca = '', noPagina = 1){
    if (idCategoria != '' && idMarca == '') {
      return this.getQuery( "categoria/"+ idCategoria + `/?page=${ noPagina }`);
    } else if (idCategoria != '' && idMarca != '') {
      return this.getQuery( "marca/"+ idCategoria + '/' + idMarca + `/?page=${ noPagina }`);
    } else if (idCategoria == '' || idMarca == ''){
      return this.getQuery(`?page=${ noPagina }`)
    }
  }
}
