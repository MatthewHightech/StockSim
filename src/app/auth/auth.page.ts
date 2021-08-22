import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  err = null;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {}

  async tempSignUp(signUpType: string) {

    if (signUpType === "student") {

      this.err = await this.authService.createStudentAccount('test student 2', '123456', 'student2@test.test', '6261');
    } else {
      this.err = await this.authService.createTeacherAccount('test teacher 6', '123456', 'teacher6@test.test', 'My sixth Class');
    }
    if (this.err != null) {
      console.log("Error: ", this.err)
      return
    }
  }

  async tempLogin(userType: string) {
    if (userType == 'student') {
      this.err = await this.authService.login("student@test.test", "123456");
    } else {
      this.err = await this.authService.login("teacher5@test.test", "123456");
    }
    if (this.err != null) {
      console.log("Error: ", this.err)
      return
    }
  }


}
