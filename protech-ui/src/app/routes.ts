import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { TarjetasProductosComponent } from './components/tarjetas-productos/tarjetas-productos.component'

const app_routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'home', component: TarjetasProductosComponent},
  { path: '', pathMatch: 'full', redirectTo: 'catalogo' },
  { path: '**', pathMatch: 'full', redirectTo: 'catalogo' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
