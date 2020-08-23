import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalagoService {
  private productos:Producto[]=[
    {
      nombre: "Pc",
      precio: 8000.00,
      descripcion: "Está medio arruinada",
      imagen: "assets/img/test/pc1.jpg"
    },
    {
      nombre: "AMD Ryzen 2700",
      precio: 1600.00,
      descripcion: "Procesador chingón",
      imagen: "assets/img/test/ryzen.jpg"
    },
    {
      nombre: "Nvidia GTX 1070ti",
      precio: 3000.00,
      descripcion: "Tarjeta gráfica nvidia ichill gtx 1070ti",
      imagen: "assets/img/test/1070.png"
    },
    {
      nombre: "Case cougar MX330-G",
      precio: 900.00,
      descripcion: "Case con vidrio templado",
      imagen: "assets/img/test/cougar.jpg"
    },
    {
      nombre: "Tarjeta madre ASUS B-450",
      precio: 1000.00,
      descripcion: "Tarjeta madre en mal estado pero igual la vendo aunque no sirva xd",
      imagen: "assets/img/test/asus.jpg"
    },
    {
      nombre: "Pc",
      precio: 8000.00,
      descripcion: "Está medio arruinada",
      imagen: "assets/img/test/pc1.jpg"
    },
    {
      nombre: "AMD Ryzen 2700",
      precio: 1600.00,
      descripcion: "Procesador chingón",
      imagen: "assets/img/test/ryzen.jpg"
    },
    {
      nombre: "Nvidia GTX 1070ti",
      precio: 3000.00,
      descripcion: "Tarjeta gráfica nvidia ichill gtx 1070ti",
      imagen: "assets/img/test/1070.png"
    },
    {
      nombre: "Case cougar MX330-G",
      precio: 900.00,
      descripcion: "Case con vidrio templado",
      imagen: "assets/img/test/cougar.jpg"
    },
    {
      nombre: "Tarjeta madre ASUS B-450",
      precio: 1000.00,
      descripcion: "Tarjeta madre en mal estado pero igual la vendo aunque no sirva xd",
      imagen: "assets/img/test/asus.jpg"
    }
  ];
  private marcas:Marca[]=[
    {
      nombre: "Intel"
    },
    {
      nombre: "Logitech"
    },
    {
      nombre: "Razer"
    },
    {
      nombre: "Hyper X"
    },
    {
      nombre: "ASUS"
    }
  ];
  constructor() { }

  getProductos():Producto[]{
    return this.productos;
  }
  getMarcas():Marca[]{
    return this.marcas;
  }

}
export interface  Producto{
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
};

export interface  Marca{
  nombre: string;
};