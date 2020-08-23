import { Component, OnInit } from '@angular/core';
import { CatalagoService, Producto, Marca } from '../../services/catalago.service';
import { fromEventPattern } from 'rxjs';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  
  productos:Producto[] = [];
  marcas:Marca[] = [];

  constructor(private _catalogoService:CatalagoService) { }

  ngOnInit(): void {
    this.productos = this._catalogoService.getProductos(),
    this.marcas = this._catalogoService.getMarcas()
  }

}
