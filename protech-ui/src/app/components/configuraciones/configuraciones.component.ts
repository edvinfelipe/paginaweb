import { Component, OnInit } from '@angular/core';
import { MarcasService, Marcas } from '../../services/marcas.service';
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})

export class ConfiguracionesComponent implements OnInit {

  marcas:Marcas[] = [];

  constructor( private _marcasService:MarcasService ) { }

  ngOnInit(): void {
    this.marcas = this._marcasService.getMarcas();

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