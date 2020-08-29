import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-panelprincipal',
  templateUrl: './panelprincipal.component.html',
  styleUrls: ['./panelprincipal.component.css']
})
export class PanelprincipalComponent implements OnInit {   
  
  constructor() { 

  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.nav_btn').click(function() {
          $('.mobile_nav_items').toggleClass('active');
      });
    });
  }

}
