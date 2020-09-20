import { Component, OnInit } from '@angular/core';
import { CategoriasService } from "../../../services/categorias.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias: any[] = [];

  constructor(private _cateogiriasService:CategoriasService) {
    this._cateogiriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
   }

  ngOnInit(): void {
  }

}
