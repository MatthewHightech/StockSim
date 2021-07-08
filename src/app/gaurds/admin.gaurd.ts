import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurd implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async canActivate(next, state) {
    if (await this.userService.isUserStudent() == false) {
      return true
    } else if (await this.userService.isUserStudent()) {
      this.router.navigate(['/']);
      return false
    } else {
      this.router.navigate(['/', 'auth']);
      return false
    }
  }
}
