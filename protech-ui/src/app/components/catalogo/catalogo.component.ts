import { Component, OnInit } from '@angular/core';
import { CatalagoService, Producto, Marca } from '../../services/catalago.service';
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
    }

  ngOnInit(): void {

  }

}
