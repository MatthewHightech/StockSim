import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { stringify } from 'querystring';
import { CompaniesService } from 'src/app/services/companies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  constructor(private userService: UserService, private companiesService: CompaniesService) { }

  ngOnInit() {}

  @Input('currentCompany') currentCompany: string
  numStocksTraded: number

  // ngOnChanges(changes: SimpleChanges) {

  //   console.log(changes.currentCompany.currentValue);
  //   // You can also use categoryId.previousValue and
  //   // categoryId.firstChange for comparing old and new values

  // }

  transaction (type: string) {
      this.userService.newTransaction(type, this.currentCompany, this.numStocksTraded, this.companiesService.companies[this.currentCompany].priceDiff[this.userService.day])
  }

}
