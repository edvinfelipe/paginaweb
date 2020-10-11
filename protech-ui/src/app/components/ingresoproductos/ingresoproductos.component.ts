import { Component, OnInit } from '@angular/core';
//componentes de form
declare var $: any;



@Component({
  selector: 'app-ingresoproductos',
  templateUrl: './ingresoproductos.component.html',
  styleUrls: ['./ingresoproductos.component.css']
})
export class IngresoproductosComponent implements OnInit {
  marcas: string[] = ['Marca 1', 'Marca 2', 'Marca 3'];
  categorias: string[] = ['Categoría 1', 'Categoría 2', 'Categoría 3'];
  urls = new Array<string>();
  sEspecificaciones: string = '';
  especificaciones = new Array<string>();
  booleano = false;
  constructor() {
  }

  ngOnInit(): void {
    $("#image").on("change", function() {
      if ($("#image")[0].files.length > 3) {
          alert("Usted ha ingresado más de 3 imágenes, así que se ingresarán al servidor las primeras 3 imágenes ingresadas únicamente.");
      }});
  }

  obtenerEspecificacion(){
    var re = /[0-9a-zA-ZÀ-ÿ\s\u00f1\u00d1:.;!#$%&/()=?¡¿/*+>_-]$/;
    var input = re.exec((<HTMLInputElement>document.getElementById("especificacion")).value);
    var longitud = (<HTMLInputElement>document.getElementById("especificacion")).value;
    if (input && (this.validarLongitud() + longitud.length) <= 800)
    {
      var valor = (<HTMLInputElement>document.getElementById("especificacion")).value;
      this.especificaciones.push(valor);
      (<HTMLInputElement>document.getElementById("especificacion")).value = '';
      this.crearEspecificaciones();
    }
    else if (!input)
    {
      alert("Ingrese letras, números y SOLO los caracteres especiales especificados: :.;!#$%&/()=?¡¿/*-+>_ (no ingrese comas, importante)")
    }
    else if (this.validarLongitud() === 800)
    {
      alert("Ya no puede ingresar más especificaciones");
    }
    else if ((this.validarLongitud() + longitud.length) > 800)
    {
      alert("Ya no puede ingresar más especificaciones (a menos que la siguiente especificación tenga " + (800-this.validarLongitud()) + " letras)");
    }
    else
    {
      alert("Especificación mal ingresada");
    }
  }

  validarLongitud()
  {
    var longitud = 0;
    for (let i = 0; i < this.especificaciones.length; i++)
    {
      longitud = longitud + this.especificaciones[i].length;
    }
    return longitud;
  }

  crearEspecificaciones()
  {
    this.sEspecificaciones = '';
    for (let i = 0; i < this.especificaciones.length; i++)
    {
      if (i === this.especificaciones.length - 1)
      {
        this.sEspecificaciones = this.sEspecificaciones + this.especificaciones[i];
        console.log(this.sEspecificaciones);
      }
      else
      {
        this.sEspecificaciones = this.sEspecificaciones + this.especificaciones[i] + ', ';
      }
    }
  }

  asignarValor(){
    this.booleano = (<HTMLInputElement>document.getElementById('cbDescuento')).checked;
  }

  validarIngreso()
  {
    if ((<HTMLInputElement>document.getElementById('cbDescuento')).checked)
    {
      if (!(<HTMLInputElement>document.getElementById('inputDescuento')).checked)
      {
        console.log('No se puede ingresar');
      }
    }
  }

  verificar()
  {
    
  }

  eliminarEspecificaciones(especificacion)
  {
    var i = this.especificaciones.indexOf(especificacion);
    if (i != -1){
      this.especificaciones.splice(i, 1);
    }
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  imgPorDefecto(urls: string[])
  {
    if (urls.length === 0)
    {
      urls[0] = "assets/img/Interrogación.png";
      urls[1] = "assets/img/Interrogación.png";
      urls[2] = "assets/img/Interrogación.png";
    }
    else if (urls.length === 1)
    {
      urls[1] = "assets/img/Interrogación.png";
      urls[2] = "assets/img/Interrogación.png";
    }
    else if (urls.length === 2){
      urls[2] = "assets/img/Interrogación.png";
    }

  }

}
