import { RouterModule, Routes } from '@angular/router';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';

const APP_ROUTES: Routes = [
    { path: 'carritocompra', component: CarritocompraComponent },
    { path: 'configuraciones', component: ConfiguracionesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'carritocompra' },
    { path: '**', pathMatch: 'full', redirectTo: 'configuraciones' }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });