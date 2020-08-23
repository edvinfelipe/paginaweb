import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTING } from './app.routes'

//Servicios
import { ProductosService } from './services/productos.service';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { from } from 'rxjs';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarritocompraComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
