import { Component, OnInit, resolveForwardRef, TemplateRef, ViewChild, ɵConsole } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from "../../services/checkout.service";
import { JsonPipe, Location } from "@angular/common";
import { CarritoUsuarioService } from "../../services/carrito-usuario.service";
import {Router} from '@angular/router';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {


  detalleproductos: any[] = []; //aqui se almacenan los productos con nuevas propiedades, cantidad y subtotal
  detallesEnvio: any;
  t: number = 0; //este es el total a pagar
  client: any; //Aqui se almacena el id de la key del sessionStorage
  metodo: any = '';//el ngmodule lo enlaza con el tipo de envio en la vista
  //aca estan las variables para los detalles del envio
  nombreenvio: string; telefonoenvio: string; nitenvio: string; emailenvio: string; direccionenvio: string = "";
  departamentoenvio: string = "Guatemala"; notaenvio: string; metodopago: string = "Pago Contra Entrega"
  //Arreglo de detalle_envio, factura y detalle_factura
  facturacion: any[] = [];
  numerofactura: any;
  isdisabled: boolean = true;


  @ViewChild("myModalConf", { static: false }) myModalConf: TemplateRef<any>;
  @ViewChild("myModalCierre", { static: false }) myModalCierre: TemplateRef<any>;
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
  /* */
  GetStorageConCliente(id_usuario: any) {
    this.CarritoConUsuarioService.getCarrito(id_usuario)
      .subscribe((data: any) => {
        //console.log(data);
        data.forEach(element => {
          let x = 0;
          //console.log(element.producto_id);
          this.checkout.getproducto(element.producto_id)
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
      });

  }


  /* esta funcino es del boton de cancelar, que regresa al carrito de compras, utiliza
     el objeto location con la funcion back, para regresar al pathurl anterior*/
  prevlocation() {
    this.Location.back();
  }
  homelocation(){
    this.router.navigate(['home']);
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
        //console.log("Compra confirmada");
        this.ConfirmacionCompra();
        this.mostrarModalCerrar();
      } else {
        //console.log("Compra denegada");
      }
    }, error => {
      console.log(error);
    });
  }

  mostrarModalCerrar(){
    this.modalService.open(this.myModalCierre).result.then(r =>{
      
      
      if (r==="gracias"){
        console.log("Gracias por su compra");
        if(JSON.parse(sessionStorage.getItem("user")) ==null){
          localStorage.clear();
          this.ResetReserva();
          //console.log("carrito limpio");
        }
        if(JSON.parse(sessionStorage.getItem("user")) !=null){
          let id = JSON.parse(sessionStorage.getItem("user"))._id;
          this.CarritoConUsuarioService.deleteAllCarrito(id).subscribe(data => {
            //console.log("carrito limpio");
          });
          this.ResetReserva();
        }
        
      }
    },
    error =>{
      console.log(error);
    });
  }
  validacioncampos(){
    
    let nombreregex =/^[a-zA-Z]+\ +[a-zA-Z]+\ *[a-zA-Z]*\ *[a-zA-Z]*\ *$/gi 
    let telefonoregex = /^\d{8}$/g
    let nitregex =/^[0-9]{6,8}\-*[0-9]{1,3}$|cf|CF|C\/F|c\/f|C\/f|c\/F|Cf|cF/gi
    let emailregex = /^[a-zA-Z0-9.!&*_-]+\ {0}@{1}\ {0}[a-zA-Z]+\ {0}\.+[a-zA-Z]{2,8}$/gi
    let direccionregex = /^.{5,100}/gi
    let notaregex = /^[a-zA-Z0-9.!&*_-]+ *.{0,200}/gi
    
    let n = false
    let t = false
    let nit = false
    let em = false 
    let d = false
    let not = true
    
    if (nombreregex.test(this.nombreenvio) == true) {
      document.getElementById("vnombre").innerText ="Nombre valido";
      document.getElementById("vnombre").style.color = "green";
      n = true;
    }else{
      document.getElementById("vnombre").innerText ="El campo debe contener al menos un nombre y un apellido";
      document.getElementById("vnombre").style.color = "red";

    }

    if (telefonoregex.test(this.telefonoenvio) == true) {
      document.getElementById("vtelefono").innerText ="Teléfono valido";
      document.getElementById("vtelefono").style.color = "green";
      t = true
    }else{
      document.getElementById("vtelefono").innerText ="El campo debe contener 8 digitos";
      document.getElementById("vtelefono").style.color = "red";
    }

    if (nitregex.test(this.nitenvio) == true) {
      document.getElementById("vnit").innerText ="Nit valido";
      document.getElementById("vnit").style.color = "green";
      nit = true
    }else{
      document.getElementById("vnit").innerText ="No puede dejar vacío el campo, escriba su nit o cf";
      document.getElementById("vnit").style.color = "red";
    }

    if (emailregex.test(this.emailenvio) == true) {
      document.getElementById("vemail").innerText ="Email valido";
      document.getElementById("vemail").style.color = "green";
      em = true
    }else{
      document.getElementById("vemail").innerText ="El email es invalido";
      document.getElementById("vemail").style.color = "red";
    }

    if (direccionregex.test(this.direccionenvio) == true) {
      document.getElementById("vdireccion").innerText ="Dirección valida";
      document.getElementById("vdireccion").style.color = "green";
      d = true
    }else{
      document.getElementById("vdireccion").innerText ="Escriba una dirección valida";
      document.getElementById("vdireccion").style.color = "red";
    }

    if (notaregex.test(this.notaenvio) == true) {
      //console.log("la nota esta bien escrita");
      not = true
    }else{
      //console.log("la nota esta mal escrita");
    }
    
    if (n ==true && t==true && nit==true && em==true && d==true &&not==true) {
        this.SetDetalleEnvio(this.nombreenvio,this.direccionenvio,this.emailenvio,this.nitenvio,
                             this.telefonoenvio,this.notaenvio);
        this.isdisabled = false;
        document.getElementById("botonConfirmacion").style.backgroundColor = "#095fbc";
    } else {
        this.isdisabled = true;
        document.getElementById("botonConfirmacion").style.backgroundColor = "#1a2a40";
    }

  }

  /* Genera el detalle del envio, con nombre, telefono, nit, memail, direccion, departamento
      y alguna nota si fuera necesario.*/
  SetDetalleEnvio(nombre,direccion,email,nit,telefono,nota) {

    let detalleenvio = {
      nombre: nombre , direccion: direccion, email: email,
      nit: nit, departamento: this.departamentoenvio, telefono: telefono,
      nota: nota, metodo_pago: "Pago Contra Entrega"
    }
    return this.detallesEnvio = detalleenvio;
  }

  /*Estas funciones estructuran el formato de tipo DATE de mongodb */
  getfechaformato() {
    let date = new Date(); let anio, mes, dia;
    anio = date.getFullYear(); mes = (date.getMonth() + 1); dia = date.getDate();
    let m, d;

    if (mes < 10) { m = '0' + mes; } else { m = mes; }
    if (dia < 10) { d = '0' + dia; } else { d = dia; }

    let fecha = anio + '-' + m + '-' + d;
    return fecha;
  }

  gethoraformato() {
    let date = new Date();
    let horas = date.getHours(); let minutos = date.getMinutes(); let segundos = date.getSeconds();

    let h; let m; let s;
    if (horas < 10) { h = '0' + horas; } else { h = horas; }
    if (minutos < 10) { m = '0' + minutos; } else { m = minutos; }
    if (segundos < 10) { s = '0' + segundos; } else { s = segundos; }
    let horafactura = h + ":" + m + ":" + s;

    return horafactura;
  }
  //Esta funcion devuelve el formato bien estructurado como es solicitado en mongodb
  GetDate() {
    let date = this.getfechaformato() + 'T' + this.gethoraformato();
    return date;
  }

  //Obtiene el identificador del cliente.
  GetClient() {
    let id_cliente;
    if (sessionStorage.length != 0) {
      id_cliente = JSON.parse(sessionStorage.getItem('user'));
      return id_cliente._id;
    } else {
      console.log("el cliente no existe");
    }

  }
  //Genera el detalle de la factura, el total la fecha y el id del cliente si existe
  GetDetalleFactura() {
    let detalle_factura = { total: this.total, fecha_venta: this.GetDate(), cliente_factura: this.GetClient() }
    return detalle_factura;

  }
  //Toma los detalles de los productos y los almacena en un arreglo de jsons
  GetDetalleProductoFactura() {
    let p = [];
    this.detalleproductos.forEach(element => {
      p.push({
        subtotal: element.subtotal, cantidad: element.cantidad, descripcion: element.descripcion,
        producto_id: element.id
      })
    });
    return p;
  }

  //Esta funcion crea un json, de otros objetos de tipo json. y contiene la informacion necesaria
  //para el post a la api.
  DetalleGeneral() {
    let DetalleGeneral = {
      det_envio: this.detallesEnvio, factura: this.GetDetalleFactura(),
      det_factura: this.GetDetalleProductoFactura()
    };
    return DetalleGeneral;
  }

  /* Esta funcion crea la facturacion y la confirmacion de compra
    hace uso de dos funciones una cuando no existe el usuario 
    y otra funcion cuando existe el usuario para poder asociarla al cliente
    esto para el historial  */
  ConfirmacionCompra() {
    //console.log("Confirmando compra y creando factura");
    this.checkout.PostFactura(this.DetalleGeneral())
      .subscribe((data: any) => {
                this.numerofactura = data.det_envio.factura;
              });

  }
  // resetea el valor de la reserva.
  ResetReserva(){
    this.detalleproductos.forEach(element => {
      this.checkout.ResetReserva(element.id,element.cantidad);
    });
  }
  constructor(private checkout: CheckoutService, private modalService: NgbModal, private Location: Location,
              private CarritoConUsuarioService: CarritoUsuarioService,private router:Router) {
    //inicializa la funcion para obtener los id's asociados al carrito de compras, para poder buscar el detalle
    //de los productos
    let usuario = JSON.parse(sessionStorage.getItem("user"));
    
    //si existe el usuario toma el carrito de compras previamente almacenado, sino toma el localStorage

    if(usuario == null){
      this.GetLocalStorage();
    }
    if(usuario!= null){
      let id_usuario = usuario._id;
      this.GetStorageConCliente(id_usuario);
    }
  }

  ngOnInit(): void {
  }

}
