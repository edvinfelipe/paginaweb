import { Component, OnInit } from '@angular/core';
import { CatalagoService} from '../../services/catalago.service';
@Component({
  selector: 'app-paginainicio',
  templateUrl: './paginainicio.component.html',
  styleUrls: ['./paginainicio.component.css']
})
export class PaginainicioComponent implements OnInit {

  arregloproductos:any[]=[];

  constructor(private _productos:CatalagoService) { }

  ngOnInit(): void {
     this._productos.getProductos()
     .subscribe( (dataProductos: any) => {
       this.arregloproductos = dataProductos.productos;
     });
  }

}
