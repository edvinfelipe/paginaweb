import { Component, OnInit } from '@angular/core';
import { ImagenesproductoService } from '../../services/imagenesproducto.service';
import { MarcasService } from '../../services/marcas.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductoService } from '../../services/producto.service';
//componentes de form
declare var $: any;



@Component({
  selector: 'app-ingresoproductos',
  templateUrl: './ingresoproductos.component.html',
  styleUrls: ['./ingresoproductos.component.css']
})
export class IngresoproductosComponent implements OnInit {
  //marcas: any[] = ['Marca 1', 'Marca 2', 'Marca 3'];
  //categorias: any[] = ['Categoría 1', 'Categoría 2', 'Categoría 3'];
  marcas: any[];
  categorias: any[];
  urls = new Array<string>();
  imagenes = new Array<any>();
  sEspecificaciones: string = '';
  especificaciones = new Array<string>();
  //false = no hay descuento
  //true = hay descuento
  booleano = false;
  indiceEspecificaciones: number = 0;
  //campos[0] = producto
  //campos[1] = descripcion
  //campos[2] = marca
  //campos[3] = categoría
  //campos[4] = precio de venta
  //campos[5] = existencia
  //campos[6] = % descuento
  campos: string[] = ['', '', '', '', '', '', ''];
  //banderaradio = 1 (disponible)
  //banderaradio = 2 (descontinuado)
  banderaradio = 0;

  constructor(private imagenesService: ImagenesproductoService, private marcasService:MarcasService, 
    private categoriasService:CategoriasService, private productoService: ProductoService) {
    this.marcasService.getMarcas()
      .subscribe( (dataMarcas: any) => {
        this.marcas = dataMarcas;
      });
    this.categoriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        this.categorias = dataCategorias;
      });
      $('#myModal').modal({backdrop: 'static', keyboard: false})
  }

  manipularBRadio(valor){
    this.banderaradio = valor;
  }

  ngOnInit(): void {
    $("#image").on("change", function() {
      if ($("#image")[0].files.length > 3) {
          alert("Usted ha ingresado más de 3 imágenes, así que se ingresarán al servidor las primeras 3 imágenes ingresadas únicamente.");
      }});
    this.validarImagenes();
  }

  validarImagenes(){
    for (let i = 0; i < 3; i++)
    {
      if (this.urls[i] === null || this.urls[i] !== 'assets/img/Interrogación.png')
      {
        this.urls[i] = 'assets/img/Interrogación.png';
      }
    }
  }

  bandera()
  {
    //Validar que todos los campos (sin incluir los checkbox ni radios) no estén vacíos
    for (let i = 0; i < this.campos.length-1; i++)
    {
      if (this.campos[i] != null)
      {
        if (this.campos[i].length === 0)
        {
          return false;
        }
      }
      else{
        return false;
      }
    }
    //Validar que al menos un radio-button esté seleccionado
    if (this.banderaradio === 0)
    {
      return false;
    }
    //Validar que, si el checkbox de descuento está seleccionado, que su campo de texto no esté vacío
    if (this.booleano === true)
    {
      if (this.campos[5].length === 0 || this.campos[5] === null)
      {
        return false;
      }
    }
    //Verificar que los campos de precio y existencia cumplan con los regex especificados
    var regexexistencia = /^\d*$/;
    var regexprecio = /^\d+(?:\.\d{1,2})?$/ ;
    var regexdescuento = /^\d{1,2}$/;
    var existencia = regexexistencia.exec((<HTMLInputElement>document.getElementById("existencia")).value);
    var precio = regexprecio.exec((<HTMLInputElement>document.getElementById("precioVenta")).value);
    
    if (!existencia || !precio)
    {
      return false;
    }
    if (this.booleano === true)
    {
      var descuento = regexdescuento.exec((<HTMLInputElement>document.getElementById("inputDescuento")).value);
      if (!descuento)
      {
        return false;
      }
    }
    //Si todos los casos anteriores se dieron, entonces retornar true
    return true;
  }

  refrescarPagina()
  {
    location.reload();
  }

  obtenerEspecificacion(){
    var re = /[0-9a-zA-ZÀ-ÿ\s\u00f1\u00d1:.;!#$%&/()=?¡¿/*+>_-]$/;
    var input = re.exec((<HTMLInputElement>document.getElementById("especificacion")).value);
    var longitud = (<HTMLInputElement>document.getElementById("especificacion")).value;
    if (input && (this.validarLongitud() + longitud.length) <= 800)
    {
      var valor = (<HTMLInputElement>document.getElementById("especificacion")).value;
      this.especificaciones.push(valor);
      (<HTMLInputElement>document.getElementById("especificacion")).value = '';
      this.crearEspecificaciones();
    }
    else if (!input)
    {
      alert("Ingrese letras, números y SOLO los caracteres especiales especificados: :.;!#$%&/()=?¡¿/*-+>_ (no ingrese comas, importante)")
    }
    else if (this.validarLongitud() === 800)
    {
      alert("Ya no puede ingresar más especificaciones");
    }
    else if ((this.validarLongitud() + longitud.length) > 800)
    {
      alert("Ya no puede ingresar más especificaciones (a menos que la siguiente especificación tenga " + (800-this.validarLongitud()) + " letras)");
    }
    else
    {
      alert("Especificación mal ingresada");
    }
  }

  ingresarImagen()
  {
    for (let i = 0; i < 3; i++)
    {
      
    }
    //this.imagenesService.postImagen().subscribe();
  }

  validarLongitud()
  {
    var longitud = 0;
    for (let i = 0; i < this.especificaciones.length; i++)
    {
      longitud = longitud + this.especificaciones[i].length;
    }
    return longitud;
  }

  crearEspecificaciones()
  {
    this.sEspecificaciones = '';
    for (let i = 0; i < this.especificaciones.length; i++)
    {
      if (i === this.especificaciones.length - 1)
      {
        this.sEspecificaciones = this.sEspecificaciones + this.especificaciones[i];
        console.log(this.sEspecificaciones);
      }
      else
      {
        this.sEspecificaciones = this.sEspecificaciones + this.especificaciones[i] + ', ';
      }
    }
  }

  manipularVector(accion: number)
  {
    if (accion === 0)
    {
      if (this.indiceEspecificaciones < (this.especificaciones.length-1))
      {
        this.indiceEspecificaciones = this.indiceEspecificaciones + 1;
      }
      
    }
    else
    {
      if (this.indiceEspecificaciones > 0)
      {
        this.indiceEspecificaciones = this.indiceEspecificaciones - 1;
      }
    }
  }

  asignarValor(){
    this.booleano = (<HTMLInputElement>document.getElementById('cbDescuento')).checked;
  }

  eliminarEspecificaciones()
  {
    this.especificaciones.splice(this.indiceEspecificaciones, 1);
    if (this.indiceEspecificaciones > 0)
    {
      this.indiceEspecificaciones = this.indiceEspecificaciones - 1;
    }
  }

  /*detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          
          console.log(this.urls.length);
        }
        reader.readAsDataURL(file);
      }
    }
  }*/

  detectFiles(event)
  {
    let files = event.target.files;
    let posicion = 0;
    console.log(files);
    if (files) {
      
      for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            if (posicion < 3)
            {
              this.urls[posicion] = e.target.result;
              posicion = posicion + 1;
            }
          }
          reader.readAsDataURL(file);
      }
    }
    this.validarImagenes();
  }

  asignarImagenes(event){
    let aux = 0;
    while (aux < event.target.files.length)
    {
      this.imagenes[aux] = event.target.files[aux];
      aux = aux + 1;
    }
  }

  ingresarImagenes(id: any)
  {
    for (let i = 0; i < 3; i++)
    {
      if (this.urls[i] === null || this.urls[i] !== 'assets/img/Interrogación.png'){
        this.imagenesService.postImagen(this.imagenes[i], id).subscribe(
          (res) => console.log(res),
          (err) => console.log(err),
          );
      }
    }
    $('#myModal').modal('show');
  }

  mostrarIndice()
  {
    console.log((<HTMLSelectElement>document.getElementById('marca')).selectedIndex);
  }

  ingresarProducto()
  {
    let id;
    let mid = this.marcas[(<HTMLSelectElement>document.getElementById('marca')).selectedIndex-1]._id;
    let cid = this.categorias[(<HTMLSelectElement>document.getElementById('categoria')).selectedIndex-1]._id;
    this.productoService.postProducto(this.campos, this.banderaradio, this.booleano, this.sEspecificaciones, mid, cid).subscribe(
      (producto: any) => {
        id = producto.producto._id;
        this.ingresarImagenes(id);
        console.log(producto);
      },
      (err) => console.log(err),
    );
    
  }

}