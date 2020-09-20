import { Component, OnInit } from '@angular/core';
import { MarcasService } from '../../services/marcas.service';
import { CategoriasService } from "../../services/categorias.service";
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})

export class ConfiguracionesComponent implements OnInit {

  marcas: any[] = [];
  categorias: any[] = [];

  constructor( private _marcasService:MarcasService, private _categoriasService:CategoriasService ) {
    this._marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        this.marcas = dataMarcas;
      });
    this._categoriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
  }


  ngOnInit(): void {
    //Desplegar ingreso categoría
    $('#btnCategoria').click(function(){
      let cat = $('#categoriatxt').val();
      let re = /^[a-zA-ZñÑ.'-]{1,25}/;
      let bandera = re.test(cat);
      if(bandera === true){
        $('#submitCategoria').modal('show');
      }
      else{
        $('#error').modal('show');
      }
    });
    //Desplegar ingreso marca
    $('#btnMarca').click(function(){
      let cat = $('#marcatxt').val();
      let re = /^[a-zA-ZñÑ.'-]{1,25}/;
      let bandera = re.test(cat);
      if(bandera === true){
        $('#submitMarca').modal('show');
      }
      else{
        $('#error').modal('show');
      }
    });

  }
}
