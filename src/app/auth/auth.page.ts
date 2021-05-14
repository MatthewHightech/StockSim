import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    // static data for testing
    const newAccount = await this.authService.createStudentAccount('test', '123456', 'test@test.test', 'ABCDEF');
    console.log('New Account: ', newAccount);
  }

}
