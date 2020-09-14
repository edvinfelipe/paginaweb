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
 
  constructor(private _catalogoService:CatalagoService, private _marcasService:MarcasService) {
    this._marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        console.log(dataMarcas);
        this.arregloMarcas = dataMarcas
      });
    this._catalogoService.getProductos()
      .subscribe( (dataProductos: any) => {
        console.log(dataProductos);
        this.arregloProductos = dataProductos
      }); 
      this.obtenerPaginas();   
    }

  ngOnInit(): void {

  }

  obtenerRadio(termino: String){
    console.log(termino);
    this._catalogoService.getFilter(`marca/${ termino }`);
  }

  paginacion(termino: number){
    console.log(termino);
    this._catalogoService.getProductos(termino)
      .subscribe( (dataProductos: any) => {
        console.log(dataProductos);
        this.arregloProductos = dataProductos
      });
  }
  
  obtenerPaginas(){
    this._catalogoService.getPaginacion()
    .subscribe( (dataPaginacion: any) => {
      console.log(dataPaginacion);
      this.numPaginas = dataPaginacion;
      this.numPaginas = Math.ceil( this.numPaginas/10);
      console.log(this.numPaginas);
      for(let i = 1; i <=this.numPaginas;i++){
        console.log(i);
        this.arregloPaginas.push(i);
      }
      console.log(this.arregloPaginas);
    }); 
  }

}
