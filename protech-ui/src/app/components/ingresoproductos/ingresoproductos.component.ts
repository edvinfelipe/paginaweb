import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-ingresoproductos',
  templateUrl: './ingresoproductos.component.html',
  styleUrls: ['./ingresoproductos.component.css']
})
export class IngresoproductosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.dropdown-menu a').click(function(){
      $('#selected').text($(this).text());
    });
    $('.dropdown-menu a').click(function(){
      $('#selected2').text($(this).text());
    });
  }
}
