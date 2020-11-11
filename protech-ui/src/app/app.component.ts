import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoginService } from '../app/services/login.service';
import { CatalagoService } from './services/catalago.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protech-ui';

  constructor(private bnIdle: BnNgIdleService, private _loginService: LoginService, private _productosService: CatalagoService) { }

  ngOnInit(): void {
    this.sessionTimeOut();
    this.localStorageTimeOut();
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
      this.bnIdle.startWatching(/* 7200 */ 10).subscribe((isTimedOut: boolean) => {
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
