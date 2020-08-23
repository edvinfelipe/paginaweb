import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ContactpageComponent } from './components/contactpage/contactpage.component';
import { HowbuyComponent } from './components/howbuy/howbuy.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { IngresoproductosComponent } from './components/ingresoproductos/ingresoproductos.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    NavbarComponent,
    ContactpageComponent,
    HowbuyComponent
    AppComponent,
    DetalleproductoComponent,
    IngresoproductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
