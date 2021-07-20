import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    const chart = <HTMLCanvasElement>document.getElementById('chart')
    const myChart = new Chart(
      chart,
      this.config
    );
  }

  data = {
    datasets: [{
      label: 'My Portfolio',
      backgroundColor: 'rgb(84, 84, 84);',
      borderColor: 'rgb(84, 84, 84);',
      data: [{
          t: '2015-03-15',
          y: 12
        },
      ],
    }]
  };

  config = {
    type: 'line',
    data: this.data,
    options: {
      scales: {
        xAxes: [{
          type: 'time',
        }]
      }
    },
  };

}
