import { Component, OnInit } from '@angular/core';
import { CatalagoService, Producto, Marca } from '../../services/catalago.service';
@Component({
  selector: 'app-paginainicio',
  templateUrl: './paginainicio.component.html',
  styleUrls: ['./paginainicio.component.css']
})
export class PaginainicioComponent implements OnInit {

  productos:Producto[]=[];

  constructor(private _productos:CatalagoService) { }

  ngOnInit(): void {
    this.productos = this._productos.getProductos();
  }

}
