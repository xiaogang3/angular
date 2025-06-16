import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { authService} from './servers/auth.server'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private auth:authService) {}
 
  canActivate(): boolean {
    
     if(this.auth.isAuthenticated()){
      return true
     }else{
      this.router.navigate(['/login'])
      return false
     }
  }
}
