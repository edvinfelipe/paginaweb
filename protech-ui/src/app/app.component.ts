import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoginService } from '../app/services/login.service';
import { CatalagoService } from './services/catalago.service';
import { Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protech-ui';

  isAdmin:boolean=false;
  constructor(private bnIdle: BnNgIdleService, private _loginService: LoginService, private _productosService: CatalagoService, private router:Router) { }

  ngOnInit(): void {
    this.sessionTimeOut();
    this.localStorageTimeOut();
    if(sessionStorage.getItem('admin') ==='ADMIN_ROLE') {
      this.isAdmin=true;
      this.router.navigate(['panelprincipal']);
    } else {
      this.isAdmin=false;
    }

  }
  private listaVenta: any[] = [];

  private sessionTimeOut(){

    if(this._loginService.getUser() != null){
      this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this._loginService.logOut();
          location.reload();
        }
      });
    }
  }
  private localStorageTimeOut(): void{
    if(localStorage.getItem('venta')){
      this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.listaVenta = JSON.parse(localStorage.getItem('venta'));
          this.listaVenta.forEach(element =>{
            this._productosService.putExistencias(element.id, element.cantidad, 'reset').subscribe(error => alert(error));
          });
          localStorage.clear();
          location.reload();
        }
      });
    }
  }

}
