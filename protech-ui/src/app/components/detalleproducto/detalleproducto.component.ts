import { Component, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CatalagoService } from '../../services/catalago.service';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.css']
})

export class DetalleproductoComponent implements OnInit {
  numero: number = 1;
  ruta = 0;
  sEspecificacion: string;
  especificaciones: string[] = [];
  rutas: string[] = [];
  id: string;
  producto: any = {};
  constructor(private router: Router, catalogoService: CatalagoService) {
    this.id = this.router.url.split('/')[2];
    
    catalogoService.getProducto(this.id)
      .subscribe( (producto: any) => {
        this.producto = producto.producto;
        console.log('Precio: ' + this.producto.precio);
        this.obtenerEspecificaciones();
        this.obtenerImagenes();
        this.obtenerImagenPrincipal();
      });
    
  }
  ngOnInit(): void {
  }

  mostrarCantidad()
  {
    console.log(this.numero);
  }

  setCantidad()
  {
    this.numero = (<HTMLInputElement>document.getElementById('cantidad')).value;
  }

  obtenerImagenPrincipal()
  {
    return this.rutas[this.ruta];
  }

  obtenerEspecificaciones(){
    for (let i = 0; i < this.producto.especificacion.split(',').length; i++)
    {
      this.especificaciones[i] = this.producto.especificacion.split(',')[i];
    }
  }

  obtenerImagenes(){
    for (let i = 0; i < 3; i++)
    {
      if (this.producto.imagenes.length > i)
      {
        this.rutas[i] = this.producto.imagenes[i].url;
      }
    }
    if (this.producto.imagenes.length === 0)
    {
      this.rutas[0] = 'assets/img/Interrogación.png';
      this.rutas[1] = 'assets/img/Interrogación.png';
      this.rutas[2] = 'assets/img/Interrogación.png';
    }
    else if (this.producto.imagenes.length === 1)
    {
      this.rutas[1] = 'assets/img/Interrogación.png';
      this.rutas[2] = 'assets/img/Interrogación.png';
    }
    else if (this.producto.imagenes.length === 2)
    {
      this.rutas[2] = 'assets/img/Interrogación.png';
    }
    
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
  retornarRuta(posicion: number)
  {
    return this.rutas[posicion];
  }
  
}
