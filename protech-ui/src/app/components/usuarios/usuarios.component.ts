import { Component, OnInit } from '@angular/core';
import {  UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {
  datos = [{codigo: '',username:'',password:''}];
  datos1 ={codigo:'',username:'',password:''};

  constructor(private api:UsuariosService) { }



  Agregar=()=>{
    if(this.datos1.codigo!=''){   //agregar el resto de campos
      if(this.datos1.username!=""){
        if(this.datos1.password!=""){
          
     
    this.api.Agregar(this.datos1).subscribe(
      data => {
        alert('ingreso existoso');
        this.datos.push(data);
      },
      error =>{
        console.log(error);
      }
    );
  }
  else{
    alert('faltan password para agregar el nuevo empleado')
  }
  }
  else{
    alert('faltandescripcion para agregar el nuevo empleado')
  }
}
  else{
    alert('faltan codigo para agregar el nuevo empleado')
  }
  }

  ngOnInit(): void {
  }

}
