import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { PortfolioComponent } from './portfolio/portfolio.component';

import { ChartsModule } from 'ng2-charts';
import { MarketComponent } from './market/market.component';
import { CompanyComponent } from './market/company/company.component';
import { NewsComponent } from './news/news.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChartsModule
  ],
  declarations: [HomePage, PortfolioComponent, MarketComponent, CompanyComponent, NewsComponent]
})
export class HomePageModule {}
