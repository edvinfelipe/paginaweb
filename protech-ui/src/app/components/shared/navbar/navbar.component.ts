import { Component, OnInit } from '@angular/core';
import { MarcasService } from "../../../services/marcas.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias: any[] = [];

  constructor(private _marcasService:MarcasService) {
    this._marcasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
   }

  ngOnInit(): void {
  }

}
