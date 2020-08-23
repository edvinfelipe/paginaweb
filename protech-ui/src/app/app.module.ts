import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ContactpageComponent } from './components/contactpage/contactpage.component';
import { HowbuyComponent } from './components/howbuy/howbuy.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    NavbarComponent,
    ContactpageComponent,
    HowbuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
