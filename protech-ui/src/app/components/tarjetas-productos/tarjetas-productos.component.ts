import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjetas-productos',
  templateUrl: './tarjetas-productos.component.html',
  styleUrls: ['./tarjetas-productos.component.css']
})
export class TarjetasProductosComponent implements OnInit {
  @Input() producto:any = {};
  @Input() index:number;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  /**
   * Función que agregará la ruta completa a la imagen recibida por el json de producto
   */
  obtenerImagen(){
    let bytes = this.producto.imagenes[0].imagen;
    let source2 = `https://api-protech.herokuapp.com/api/imagen/${bytes}`;
    return source2;
  }
}
