import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CompaniesService } from '../services/companies.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router,
    public authService: AuthService,
    public userService: UserService,
    public companiesService: CompaniesService
    ) {}

}
