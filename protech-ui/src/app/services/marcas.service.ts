import { Injectable } from '@angular/core';

@Injectable()
export class MarcasService {

    private marcas:Marcas[] = [
        {
            id: 1,
            nombre: "Acer",
        },
        {
            id: 2,
            nombre: "Samsung",
        },
        {
            id: 3,
            nombre: "LG",
        },
        {
            id: 4,
            nombre: "HP",
        }
    ]

    constructor(){
        console.log("Service ready");
    }

    getProductos():Marcas[]{
        return this.marcas;
    }
}

export interface Marcas{
    id: number;
    nombre: string;
}