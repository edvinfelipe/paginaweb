import { Component, OnInit, resolveForwardRef, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { count, single } from 'rxjs/operators';
import { CheckoutService } from "../../services/checkout.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  
  detalleproductos: any[] = []; //aqui se almacenan los productos con nuevas propiedades, cantidad y subtotal
  t: number = 0; //este es el total a pagar
  client: any; //Aqui se almacena el id de la key del sessionStorage
  metodo: any = '';//el ngmodule lo enlaza con el tipo de envio en la vista
  //aca estan las variables para los detalles del envio
  nombreenvio:string; telefonoenvio: number; nitenvio: number; emailenvio: string; direccionenvio:string;
  departamentoenvio: string; notaenvio:string; 

  @ViewChild("myModalConf", { static: false }) myModalConf: TemplateRef<any>;

  /* Esta funcion  recoge los productos que se encuentran en localstorage, los almacena en un arreglo
     */
  GetLocalStorage() {
    let producto = JSON.parse(localStorage.getItem("venta"));

    producto.forEach(element => {
      let x = 0;
      this.checkout.getproducto(element.id)
        .subscribe((data: any) => {

          Object.defineProperty(data.producto, 'cantidad', { value: 1, writable: true });
          Object.defineProperty(data.producto, 'subtotal', { value: 1, writable: true });
          data.producto.cantidad = parseInt(element.cantidad);
          x = (data.producto.precio * data.producto.cantidad) - (data.producto.precio * data.producto.porcenjateOferta);
          data.producto.subtotal = x;
          this.detalleproductos.push(data.producto);
          this.t += x;
        });
    });
  }

  /* esta funcino es del boton de cancelar, que regresa al carrito de compras, utiliza
     el objeto location con la funcion back, para regresar al pathurl anterior*/
  prevlocation() {
    this.Location.back();
  }
  /* Un metodo accesor simple para el total*/
  get total() {
    return this.t;
  }

  /* esta funcion es la confirmacion de compra, toma el valor del boton
     si se confirma realiza la confirmacion de compra y ejecuta la facturacion
     si no, regresa a la vista*/
  mostrarModalConf() {
    this.modalService.open(this.myModalConf).result.then(r => {

      if (r === "Si") {
        console.log("Compra confirmada");
        this.ConfirmacionCompra();

      } else {
        console.log("Compra denegada");
      }
    }, error => {
      console.log(error);
    });
  }

  /* Genera el detalle del envio, con nombre, telefono, nit, memail, direccion, departamento
      y alguna nota si fuera necesario.*/
  GenerarDetalleEnvio(){
    let detalleenvio = {nombre: this.nombreenvio, telefono:this.telefonoenvio, nit: this.nitenvio,
         email:this.emailenvio, direccion:this.direccionenvio, departamento: this.departamentoenvio,
         nota:this.notaenvio, metodoenvio: this.metodo}
      console.log("Nombre"+this.nombreenvio)
    let detalleenvioJSON = JSON.stringify(detalleenvio); 
    console.log("Detalle de envio "+ detalleenvioJSON);
  }


  /* Esta funcion crea la facturacion y la confirmacion de compra
    hace uso de dos funciones una cuando no existe el usuario 
    y otra funcion cuando existe el usuario para poder asociarla al cliente
    esto para el historial  */
  ConfirmacionCompra() {
    //console.log("Confirmando compra y creando factura");
    console.log(this.t);
    if (sessionStorage.length === 0) { 
      //console.log("Usuario no registrado");
      this.checkout.postfacturasincliente(this.t).subscribe((data: any) => console.log(data));
      this.GenerarDetalleEnvio();
    } else {
      console.log("Usuario registrado");
      //this.client = this.getCliente();
      this.checkout.postfacturaconcliente(this.t, this.client).subscribe((data: any) => console.log(data));
    }

  }
  // Funcion que obtiene el id del cliente del SessionStorage
  getCliente() {
    return this.client = sessionStorage.getItem('id');
  }

  constructor(private checkout: CheckoutService, private modalService: NgbModal, private Location: Location) {
    //inicializa la funcion para obtener los id's asociados al carrito de compras, para poder buscar el detalle
    //de los productos
    this.GetLocalStorage();

  }

  ngOnInit(): void {
  }

}
