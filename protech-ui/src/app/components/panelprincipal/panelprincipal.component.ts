import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
/* import * as $ from 'jquery'; */

@Component({
  selector: 'app-panelprincipal',
  templateUrl: './panelprincipal.component.html',
  styleUrls: ['./panelprincipal.component.css']
})
export class PanelprincipalComponent implements OnInit {
  change = 0;
  constructor( private _loginService :LoginService) {

  }

  ngOnInit(): void {
  }
  switchMenu(): void{
    if(this.change == 0){
      document.getElementById('changeOption').style.display = 'block';
      this.change = 1;
    }else{
      document.getElementById('changeOption').style.display = 'none';
      this.change = 0;
    }

  }

  onLogOut(){
    this._loginService.logOut();
    location.reload();
  }
}
