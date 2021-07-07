import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGaurd implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async canActivate(next, state) {
    console.log("Is student (student): ", await this.userService.isUserStudent())
    if (await this.userService.isUserStudent()) {
      console.log("Student page")
      return true
    } else if (await this.userService.isUserStudent() == false) {
      this.router.navigate(['/', 'admin']);
      return false
    } else {
      this.router.navigate(['/', 'auth']);
      return false
    }
  }
}
