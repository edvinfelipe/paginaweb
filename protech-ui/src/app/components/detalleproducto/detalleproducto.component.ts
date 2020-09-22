import { Component, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})

export class DetalleproductoComponent implements OnInit {
  numero = 1;
  ruta = 0;
  especificaciones: string[] = ['Especificación 1', 'Especificación 2', 'Especificacion 3', 'Especificacion 4',
  'Especificacion 5', 'Especificacion 6', 'Especificacion 7'];
  rutas: string[] = ['assets/img/Samsung.jpg', 'assets/img/Samsung3.jpg'];
  constructor() {
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  manipularContador(accion: number)
  {
    if (this.numero > 1 && accion === 0)
    {
      this.numero = this.numero - 1;
    }
    else if (accion === 1)
    {
      this.numero = this.numero + 1;
    }
    // tslint:disable-next-line: no-trailing-whitespace
  }

  // tslint:disable-next-line: typedef
  asignarRuta(ruta: number)
  {
    this.ruta = ruta;
  }
  // tslint:disable-next-line: typedef
  retornarRuta()
  {
    return this.ruta;
  }
  
}
