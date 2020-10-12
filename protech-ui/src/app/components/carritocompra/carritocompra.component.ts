import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { CatalagoService } from '../../services/catalago.service';
import { ActivatedRoute } from '@angular/router'
import { ConstantPool } from '@angular/compiler';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-carritocompra',
  templateUrl: './carritocompra.component.html',
  styleUrls: ['./carritocompra.component.css']
})
export class CarritocompraComponent implements OnInit {
  
  listaVenta: any[] = [];
  productos: any[] = [];
  prod: any;
  subtotal = 99999;
  objProducto: any;
  fila = -1;


  constructor( private _productosService: CatalagoService, private router: ActivatedRoute) {
      this.verificarParams();
   }

  ngOnInit(): void {
  }
  
  /* PARA CARGAR AL CARRITO ------------------------------------------------------------------------------ */
  verificarParams(): void{
    this.router.params.subscribe( params => {
      if(Object.entries(params).length === 0){
        this.cargarStorage();
      } else {
        this.cargarStorage();
        this.objProducto = params;
        this.agregarProducto(this.objProducto);
        this.objProducto = [];
        this.cargarCarrito();
      }
    });
  }
  cargarCarrito(): void{
    this.productos = [];
    this.listaVenta.forEach( element => {
      this._productosService.getProducto(element.id)
      .subscribe((producto: any) => {
        this.prod = producto.producto;
        this.productos.push(this.prod);
      });
    });
  }
  agregarProducto(prod: any): void{
    if (this.listaVenta.length === 0){
      this.listaVenta.push(prod);
      this.guardarStorage(this.listaVenta);
      this.cargarStorage();
    } else {
      let equal = -1;
      for (let i = 0; i < this.listaVenta.length; i++){
        if (this.listaVenta[i].id === prod.id){
          equal = i;
          i = this.listaVenta.length;
        }
      }
      if (equal === -1){
        this.listaVenta.push(prod);
        this.guardarStorage(this.listaVenta);
        this.cargarStorage();
      } else{
        this.listaVenta[equal].cantidad = prod.cantidad;
        this.guardarStorage(this.listaVenta);
        this.cargarStorage();
      }
    }
  }
  /* DATOS DEL LOCALSTORAGE ------------------------------------------------------------------------------ */
  cargarStorage(): void{
    this.listaVenta = [];
    if(localStorage.getItem('venta')){
      this.listaVenta = JSON.parse(localStorage.getItem('venta'))
    } else {
      this.listaVenta = [];
    }
  }
  guardarStorage(prod: any): void{
    localStorage.setItem('venta', JSON.stringify(prod));
  }

  /* Botones más y menos ------------------------------------------------------------------------------ */
  inc(elementI, elementS, idx): void{
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })

    let elementCantidad = document.querySelector(`[name="${elementI}"]`) as HTMLInputElement;
    let cant = parseInt(elementCantidad.value);
    let precio = this.productos[idx].precio;
    let subT = 0;
    if( cant < 200){
      cant = cant + 1;
      subT = cant * precio;
      elementCantidad.value = cant.toString();
      document.getElementById(elementS).innerHTML = formatter.format(subT);
      this.listaVenta[idx].cantidad = cant;
      this.guardarStorage(this.listaVenta);
      this.getTotal();
    }
  }
  
  dec(elementI, elementS, idx): void {
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })

    let elementCantidad = document.querySelector(`[name="${elementI}"]`) as HTMLInputElement;
    let cant = parseInt(elementCantidad.value);
    let precio = this.productos[idx].precio;
    let subT = 0;
    if (cant > 1) {
      cant = cant - 1;
      subT = cant * precio;
      elementCantidad.value = cant.toString();
      document.getElementById(elementS).innerHTML = formatter.format(subT);
      this.listaVenta[idx].cantidad = cant;
      this.guardarStorage(this.listaVenta);
      this.getTotal();
    }
  }

  /* Botón eliminar */
  getRow(idx): void{
    this.fila = idx;
  }
  
  deleteRow(): void{
    // let delete_id = this.productos.find((product) => {
    //   return product.id == this.fila;
    // });

    this.listaVenta.splice(this.fila, 1);
    this.productos.splice(this.fila, 1);
    this.guardarStorage(this.listaVenta);
    this.cargarStorage();
    this.fila = -1;
  }

  /* TOTAL */

  getTotal(): number{
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2
    })

    let precio = 0;
    let cantidad = 0;
    let total = 0;
    for (let i = 0; i < this.listaVenta.length; i++){
      cantidad = this.listaVenta[i].cantidad;
      precio = this.productos[i].precio;
      total = total + (cantidad * precio);
    }
    /* document.getElementById("tabTotal").innerHTML = formatter.format(total); */
    return total;
  }
  /* Cargar la cantidad */
  getCantidad(productoId): number{
    let cant = 0;
    this.listaVenta.forEach(element => {
        if (element.id === productoId){
          cant = element.cantidad;
        } 
    });
    return cant;
  }
}
