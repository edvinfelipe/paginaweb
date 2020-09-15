import { Component, OnInit } from '@angular/core';
import { CatalagoService } from '../../services/catalago.service';
import { fromEventPattern } from 'rxjs';
import { MarcasService } from '../../services/marcas.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  arregloProductos: any[] = [];
  arregloMarcas: any[] = [];
  arregloPaginas: any = [];
  numPaginas: number;
  constructor(private _catalogoService: CatalagoService, private _marcasService: MarcasService) {
    this._marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        this.arregloMarcas = dataMarcas;
      });
    this._catalogoService.getProductos()
      .subscribe( (dataProductos: any) => {
        this.arregloProductos = dataProductos.productos;
      });
    this.obtenerPaginas();
    }

  ngOnInit(): void {

  }

  obtenerRadio(termino: String): void{
    console.log(termino);
    /* this._catalogoService.getFilter(`marca/${ termino }`); */
  }

  paginacion(termino: number): void{
    this._catalogoService.getProductos(termino)
      .subscribe( (dataProductos: any) => {
        this.arregloProductos = dataProductos.productos;
      });
  }

  obtenerPaginas(): void{
    this._catalogoService.getProductos()
    .subscribe( (dataPaginacion: any) => {
      this.numPaginas = dataPaginacion.count;
      this.numPaginas = Math.ceil( this.numPaginas / 10);
      for (let i = 1; i <= this.numPaginas; i++){
        this.arregloPaginas.push(i);
      }
    });
  }

}
