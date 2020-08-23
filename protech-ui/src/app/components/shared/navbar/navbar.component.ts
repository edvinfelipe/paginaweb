import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   menu:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  mostrarBoton(){

    if(this.menu){
      this.menu = false;
    }else{
      this.menu= true;
    }
  }
}
