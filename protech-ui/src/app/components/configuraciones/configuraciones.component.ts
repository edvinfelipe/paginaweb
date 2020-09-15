import { Component, OnInit } from '@angular/core';
import { MarcasService } from '../../services/marcas.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

//  marcas:Marcas[] = [];

  constructor( private _marcasService:MarcasService ) { }

  ngOnInit(): void {
  }

}
