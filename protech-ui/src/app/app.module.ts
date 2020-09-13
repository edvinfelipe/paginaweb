import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//Rutas
import { APP_ROUTING } from './routes';
//Servicios

//Componentes
import { ProductosService } from './services/productos.service';
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
import { PanelprincipalComponent } from './components/panelprincipal/panelprincipal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    TarjetasProductosComponent,
    FooterComponent,

    AppComponent,
    AboutusComponent,
    NavbarComponent,
    ContactpageComponent,
    HowbuyComponent,
    AppComponent,
    DetalleproductoComponent,
    IngresoproductosComponent,
    CarritocompraComponent,
    PanelprincipalComponent,
    CheckoutComponent,
    ConfiguracionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    AppRoutingModule,
  ],
  providers: [
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
