import { Component, OnInit } from '@angular/core';
import {  UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {
  datos = [{nombre:"",username:'',password:'',correo:""}];
  datos1 ={nombre:"",username:'',password:'',correo:""};
  datos2 =[{role:"",eliminado:'flase',_id:"",nombre:"",direccion:"",telefono:"",username:"",__v:'',}];
  datos3 ={passwordA:""};

  constructor(private api:UsuariosService) { 
   this.getDatos();
   
  }

 getDatos=()=>{
    this.api.getTODOSLOSDATOS().subscribe(
      data =>{
          this.datos2=data;
          console.log(data);

      },
      error =>{
        console.log(error);
      }
    );
  }

  Agregar=()=>{
    if(this.datos1.nombre!=""){   //agregar el resto de campos
      if(this.datos1.correo!=""){
        if(this.datos1.username!=""){
        if(this.datos1.password!=""){
         if(this.datos1.password==this.datos3.passwordA){

          
     
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
    alert('contraseña no es igual')
  }
  }
  else{
    alert('faltan password para agregar el nuevo empleado')
  }
  }
  else{
    alert('faltan Usuario para agregar el nuevo Usuario')
    
  }
}
else{
  alert('faltan correo electronico para agregar el nuevo Usuario')
}
}
  else{
    alert('faltan Nombre para agregar el nuevo Usuario')
  }
  }

  ngOnInit() {
  }

}