import { Component, OnInit } from '@angular/core';
import { HistorialServiceService } from "../../services/historial-service.service";
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  HistorialCompras: any[] = [];
  DetalleProductos: any[] = [];
  DetalleEnvio: any;
  Cliente: any;

  GetDatosCliente(){
    this.Cliente = JSON.parse(sessionStorage.getItem("user"));
    console.log(this.Cliente);
  }

  GetCompras(){
    let id_cliente = this.HistorialServicio.GetUsuarioActual();
    this.HistorialServicio.GetCompras(id_cliente)
    .subscribe((data:any)=>{ 
      data.factura.forEach(element => {
        this.HistorialCompras.push({idcompra:element._id,fechacompra:element.fecha_venta, 
                                    total:element.total});
      });
    })

  }
  getBoton(id_factura: any){
    console.log(id_factura);
    this.DetalleProductos= [];
    this.HistorialServicio.GetDetalleProductos(id_factura)
    .subscribe((data:any)=>{
      console.log(data);
      data.detalle.forEach(element => {
        this.DetalleProductos.push({descripcion:element.descripcion,cantidad:element.cantidad,
                                    descuento:"?",precio:"pendiente",subtotal:"pendiente"});
      });
    }
    );
    console.log("Aqui deberia estar el detalle");
  }

  GetDetalleEnvio(){
    this.DetalleEnvio = {nombre:"nombre del sujeto", Fecha:" 12/12/12", total:"1,000.00"};
  }

  GetDetalleCompra(){
    this.DetalleProductos = [{descripcion:" Producto computadora",cantidad:"3",descuento:"10%",precio:100,subtotal:200},
                          {descripcion:" Producto computadora",cantidad:"2",descuento:"no aplica",precio:100,subtotal:"200"}]
  }



  constructor(private HistorialServicio: HistorialServiceService) {
    this.GetDatosCliente();
    this.GetCompras();
    this.GetDetalleEnvio();
    //this.GetDetalleCompra();
  }
  

  ngOnInit(): void {
  }

}
