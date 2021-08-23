import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input('currentCompany') currentCompany: string

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes.currentCompany.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
}

  transaction (type: string, company: string) {

  }

}
