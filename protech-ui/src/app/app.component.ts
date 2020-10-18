import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

import { LoginService } from "../app/services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protech-ui';

  constructor(private bnIdle: BnNgIdleService, private _loginService:LoginService) { }

  ngOnInit(): void {
    this.sessionTimeOut();
  }

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

}
