import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const chart = <HTMLCanvasElement>document.getElementById('chart')
    const myChart = new Chart(
      chart,
      this.config
    );
  }

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  data = {
    labels: this.labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  config = {
    type: 'line',
    data: this.data,
    options: {}
  };

}
