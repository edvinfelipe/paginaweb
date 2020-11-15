import { Component, OnInit } from '@angular/core';
import { HistorialServiceService } from "../../services/historial-service.service";
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {
  /* variables globales  */
  HistorialCompras: any[] = [];
  DetalleProductos: any[] = [];
  DetalleEnvio: any;
  InfoFactura: any;
  Cliente: any;
  total: any;
  //Obtiene el cliente que esta logeado, y lo obtiene del sessionstorage
  GetDatosCliente() {
    this.Cliente = JSON.parse(sessionStorage.getItem("user"));
    //console.log(this.Cliente);
  }
  /* Funcion que obtiene todas las compras realizadas por un cliente
     hace uso del servicio historialservicio y de su metodo get compras
     y devuelve todos los detalles de las facturas relacionadas con 
     el id del usuario y lo almacena en historial compras para luego
     ser llamado desde la vista*/
  GetCompras() {
    let id_cliente = this.HistorialServicio.GetUsuarioActual();

    this.HistorialServicio.GetCompras(id_cliente)
      .subscribe((data: any) => {
        data.factura.reverse().forEach(element => {
          this.HistorialCompras.push({
            idcompra: element._id, fechacompra: element.fecha_venta,
            total: element.total
          });
        });
      })
  }
  /*Este elemento es llamado desde la vista, y su funcion
    es mostrar la informacion relacionada con el detalle de la factura
    es decir muestra todos los elementos necesarios para el detalle
    de la compra */
  getBoton(id_factura: any) {
    //console.log(id_factura);
    this.DetalleProductos = [];
    this.total = 0;
    this.GetDetalleEnvio(id_factura);
    this.HistorialServicio.GetDetalleProductos(id_factura)
      .subscribe((data: any) => {
        data.detalle.forEach(element => {
          this.total += ((element.producto_id.precio * element.cantidad) - (element.producto_id.porcenjateOferta * element.producto_id.precio));
          this.DetalleProductos.push({
            descripcion: element.descripcion, cantidad: element.cantidad,
            descuento: element.producto_id.porcenjateOferta, precio: element.producto_id.precio,
            subtotal: ((element.producto_id.precio * element.cantidad) - (element.producto_id.porcenjateOferta * element.producto_id.precio))
          });
        });
      });
  }
  /* obtiene el detalle del envio, su direccion, la nota y su metodo de envio */
  GetDetalleEnvio(id_envio) {
    this.DetalleEnvio = {direccion: "", anotacion: "",metodoenvio: ""};
    this.InfoFactura ={nombre:"",fecha:"",total:""}
    this.HistorialServicio.GetDetalleEnvio(id_envio)
    .subscribe((data: any)=>{
      //console.log("///////////////");
      //console.log(data);
      this.InfoFactura ={nombre:JSON.parse(sessionStorage.getItem("user")).nombre,fecha:data.factura.fecha_venta,total:data.factura.total}
      this.DetalleEnvio = { direccion: data.factura.cliente_envio.direccion, anotacion: data.factura.cliente_envio.nota,
                            metodoenvio: data.factura.cliente_envio.metodo_pago};
    });
  }
  /*obtiene el nombre del cliente. */
  GetNombreCliente(id_cliente){
    let NombreCliente = JSON.parse(sessionStorage.getItem("user")).nombre;
    return NombreCliente.nombre;
  }
  /* constructor, que llama a la clase historialservice */
  constructor(private HistorialServicio: HistorialServiceService) {
    this.GetDatosCliente();
    this.GetCompras();
    this.GetDetalleEnvio("");
  }
  
  ngOnInit(): void {
  }

}
