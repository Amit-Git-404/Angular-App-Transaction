import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ChartsModule } from 'ng2-charts';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { SpendAnalysisComponent } from './spend-analysis/spend-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    ViewTransactionsComponent,
    ExpenditureComponent,
    SpendAnalysisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
