import { Component, OnInit } from '@angular/core';
import { HistorialServiceService } from "../../services/historial-service.service";
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  HistorialCompras: any[] = [];
  DetalleCompra: any[] = [];
  DetalleEnvio: any;
  Cliente: any;

  GetDatosCliente(){
    this.Cliente = JSON.parse(sessionStorage.getItem("user"));
    console.log(this.Cliente);
  }

  GetCompras(){
    this.HistorialCompras = [{compra:"compra de prueba", precio:"precio de prueba 1234"}];
  }

  GetDetalleEnvio(){
    this.DetalleEnvio = {nombre:"nombre del sujeto", Fecha:" 12/12/12", total:"1,000.00"};
  }

  GetDetalleCompra(){
    this.DetalleCompra = [{descripcion:" Producto computadora",cantidad:"3",descuento:"10%",precio:100,subtotal:200},
                          {descripcion:" Producto computadora",cantidad:"2",descuento:"no aplica",precio:100,subtotal:"200"}]
  }



  constructor(HistorialServicio: HistorialServiceService) {
    this.GetDatosCliente();
    this.GetCompras();
    this.GetDetalleEnvio();
    this.GetDetalleCompra();
  }
  

  ngOnInit(): void {
  }

}
