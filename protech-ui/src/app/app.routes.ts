import { RouterModule, Routes } from '@angular/router';
import { CarritocompraComponent } from './components/carritocompra/carritocompra.component';

const APP_ROUTES: Routes = [
    { path: 'carritocompra', component: CarritocompraComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'carritocompra' }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });