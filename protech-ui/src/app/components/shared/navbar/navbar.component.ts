import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoriasService } from "../../../services/categorias.service";
import { LoginComponent } from "../../login/login.component";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias: any[] = [];

  constructor(private _cateogiriasService:CategoriasService,private modalService: NgbModal) {
    this._cateogiriasService.getCategorias()
      .subscribe( (dataCategorias: any) => {
        console.log(dataCategorias);
        this.categorias = dataCategorias;
      });
   }

  ngOnInit(): void {
  }

  open() {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(LoginComponent);

  }
}
