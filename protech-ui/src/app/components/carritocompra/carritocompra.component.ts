import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';


@Component({
  selector: 'app-carritocompra',
  templateUrl: './carritocompra.component.html',
  //styleUrls: ['./carritocompra.component.css']
})
export class CarritocompraComponent implements OnInit {
  
  productos:Producto[] = [];
  subtotal:Number = 99999.99;

  constructor( private _productosService:ProductosService) { }

  ngOnInit(): void {
    this.productos = this._productosService.getProductos();
  }

}
