import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { PedidosService } from "../../services/pedidos.service";
import { EstadoPedido } from "../../interfaces/pedido";


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  facturas:any[] = [];
  detallesFactura:any = [];
  pagina = 1;
  numeroFacturas;
  formDate: FormGroup;
  fechainicio;
  fechaFin;
  opciones:any = ["Mas recientes","Rango de fechas"];
  mostrarFechas:boolean;
  tipoDeVista=null;
  nombreCliente;
  totalFactura;
  fechaFactura;
  estadoPedido:EstadoPedido;
  constructor(private _pedidoService:PedidosService,private formBuilder:FormBuilder, private toastr: ToastrService) {
    this.buildFormDate();
  }

  ngOnInit(): void {
  }

  private buildFormDate() {
    this.formDate = this.formBuilder.group({
      startDate: ['',[Validators.required]],
      endDate: ['']
    });
  }

  getFacturas(noPagina=1) {
    this._pedidoService.getFacturas(noPagina).subscribe((data:any)=>{
      console.log(data);
      this.facturas= data['factura'];
      this.numeroFacturas = data.count;
    });
  }

  getDetallesFactura(idFactura) {
    this._pedidoService.getDetallesFactura(idFactura).subscribe((data:any)=>{
      this.detallesFactura=data['detalle'];
      console.log(data);
    });
  }

  getFacturasPorFechas(page=1) {
    if(this.validateDate()){

      this._pedidoService.getRangoFechas(this.fechainicio,this.fechaFin,page).subscribe((data:any) =>{
        this.facturas=data['factura'];
        this.numeroFacturas = data.count;
      });
    }
  }

  getNexPage(pagina){
    console.log(pagina);
    if(this.mostrarCalendario()){
      if(this.validateDate()){
        this.getFacturasPorFechas(pagina);
      }
    }else{
      this.getFacturas(pagina);
    }
  }

  tipoVista(){

    if(this.mostrarCalendario()){
      this.getFacturasPorFechas();
    }else if(this.mostrarCalendario()==false){
      this.getFacturas();
    }else{
      this.toastr.error("Seleccione una opcion","Adventencia");
    }
  }

  mostrarCalendario() {

    if(this.tipoDeVista=="Mas recientes"){
     return false;
    } else if (this.tipoDeVista=="Rango de fechas"){
      return true;
    }

  }

  obtenerDatosCliente(nombre,fecha,total) {
    this.nombreCliente=nombre;
    this.fechaFactura = fecha;
    this.totalFactura = total;
  }

  cambiarEstado(estado,index,idPedido){

    if(estado){
      this.facturas[index].cliente_envio.entregado=false;
      this.estadoPedido = {
        entregado: false
      }
    } else {
      this.facturas[index].cliente_envio.entregado=true;
      this.estadoPedido = {
        entregado: true
      }
    }

    this._pedidoService.putEstadoEntrega(this.estadoPedido,idPedido).subscribe((data)=>{
      if(data['status']){
        this.toastr.success("Venta completado","Prothech");
      } else {
        this.toastr.success("Venta pendiente de completar","Prothech");
      }
    });
  }
  private validateDate():boolean {

    if(this.formDate.valid){

      if( new Date(this.formDate.get('startDate').value) < new Date(this.formDate.get('endDate').value)){
        console.log("Aceptado");
        this.fechainicio = this.formDate.get('startDate').value;
        this.fechaFin = this.formDate.get('endDate').value;
        return true;

      }else{
        this.toastr.error("Rango de fechas no valido","Adventencia");
        return false;
      }
    }else{
      this.toastr.error("Debe seleccionar un rango de fechas","Advertencia");
      return false;
    }
  }
}
