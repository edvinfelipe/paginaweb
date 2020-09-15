import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';


@Component({
  selector: 'app-carritocompra',
  templateUrl: './carritocompra.component.html',
  styleUrls: ['./carritocompra.component.css']
})
export class CarritocompraComponent implements OnInit {
  
  productos:Producto[] = [];
  subtotal:Number = 99999.99;
  private numeros:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]; 


  constructor( private _productosService:ProductosService) { }

  ngOnInit(): void {
    this.productos = this._productosService.getProductos();
  }

}
