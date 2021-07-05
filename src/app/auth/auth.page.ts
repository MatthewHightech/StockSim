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
      this.err = await this.authService.createStudentAccount('test student 5', '123456', 'student5@test.test', '1488');
    } else {
      this.err = await this.authService.createTeacherAccount('test teacher 5', '123456', 'teacher5@test.test', 'My fifth Class');
    }
    if (this.err != null) {
      console.log("Error: ", this.err)
      return
    }
    this.loadAppropriateUserData()
  }

  async tempLogin(userType: string) {
    if (userType == 'student') {
      this.err = await this.authService.login("student5@test.test", "123456");
    } else {
      this.err = await this.authService.login("teacher5@test.test", "123456");
    }
    this.loadAppropriateUserData()
  }

  async loadAppropriateUserData() {
    const isStudent = await this.userService.isUserStudent()
    if (isStudent) {
      console.log("This user is a student")
      this.userService.initStudent();
    } else {
      console.log("This user is a teacher")
      this.userService.initTeacher();
    }
  }

}
