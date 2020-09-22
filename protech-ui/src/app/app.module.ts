import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

//Rutas
import { APP_ROUTING } from './app.routes';
//Servicios
import { MarcasService } from './services/marcas.service';
import { ProductosService } from './services/productos.service';
//Componentes
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ContactpageComponent } from './components/contactpage/contactpage.component';
import { HowbuyComponent } from './components/howbuy/howbuy.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { IngresoproductosComponent } from './components/ingresoproductos/ingresoproductos.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { TarjetasProductosComponent } from './components/tarjetas-productos/tarjetas-productos.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';
import { PaginainicioComponent } from './components/paginainicio/paginainicio.component';
import { PanelprincipalComponent } from './components/panelprincipal/panelprincipal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';

import { HttpClientModule } from '@angular/common/http';
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    TarjetasProductosComponent,
    FooterComponent,
    AboutusComponent,
    NavbarComponent,
    ContactpageComponent,
    HowbuyComponent,
    DetalleproductoComponent,
    IngresoproductosComponent,
    CarritocompraComponent,
    PaginainicioComponent,
    PanelprincipalComponent,
    PanelprincipalComponent,
    CheckoutComponent,
    ConfiguracionesComponent,
    HistorialComprasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [
    ProductosService,
    MarcasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
