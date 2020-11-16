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
    if(sessionStorage.getItem('user')){
      return true;
    } else{
      this.router.navigate(['home'])
      return false;
    }
  }
  
}
