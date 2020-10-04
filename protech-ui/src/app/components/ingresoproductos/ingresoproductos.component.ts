import { Component, OnInit } from '@angular/core';
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
  especificacion: string;
  constructor() {
  }

  ngOnInit(): void {
    $("#image").on("change", function() {
      if ($("#image")[0].files.length > 3) {
          alert("Usted ha ingresado más de 3 imágenes, así que se ingresarán al servidor las primeras 3 imágenes ingresadas únicamente.");
      }});
  }

  obtenerEspecificacion(){
    console.log('Especificación ingresada: ')
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
