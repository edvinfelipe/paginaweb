import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router){  

  }
  canActivate(){
    let user;
    if(sessionStorage.getItem('user')){
      user = sessionStorage.getItem('user');
      if(user.role === 'ADMIN_ROLE'){
        return true;
      }else{
        this.router.navigate(['home']);
        return false;
      }
    } else{
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
