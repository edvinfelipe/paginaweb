import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleproductoComponent } from './components/detalleproducto/detalleproducto.component';
import { IngresoproductosComponent } from './components/ingresoproductos/ingresoproductos.component';

@NgModule({
  declarations: [
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
