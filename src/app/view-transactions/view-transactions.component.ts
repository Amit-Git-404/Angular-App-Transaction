import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionModel } from '../expenditure/expenditure.component';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent {
  @Input() AllTransactions:TransactionModel[] = [];
  @Output() submitMonth:EventEmitter<number> = new EventEmitter<number>();

  Frequencies:string[] = ["Current", "Monthly"];
  LastSixMonthsArray:string[] = [];
  Categories:string[] = ["All", "Medical", "Travel", "Loans", "Utility Bills", "Education", "Shopping", "Misc"];
  //AllTransactions:TransactionModel[] = [];
  TransactionsToConsider:TransactionModel[] = [];
  chartLabels:Label[] = [];
  chartData: SingleDataSet = [];

  //chartLabels:Label[] = [['INSURANCE'], ['SAVING'], ['GAS'], ['ENTERTAINMENT'], ['CAR'], ['MOVING']];
  private monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  isMonthDisabled:boolean = true;

  constructor() { }

  ngOnChanges() {
    this.TransactionsToConsider = this.AllTransactions;
    this.calculateChartData();
  }

  ngOnInit() {
    this.getLastSixMonths();
  }

  private calculateChartData(){
    this.chartLabels = [];
    this.chartData = [];
    let totalExpand:number = 0;
    let categoryToExpand = {};
    this.TransactionsToConsider.forEach(x => {
      totalExpand += x.amount;
      if (categoryToExpand[x.category]) {
        let categoryAmount: number = categoryToExpand[x.category];
        categoryAmount += x.amount;
        categoryToExpand[x.category] = categoryAmount;
      } else {
        categoryToExpand[x.category] = x.amount;
      }
    });
    for (var property in categoryToExpand) {
      if (categoryToExpand.hasOwnProperty(property)) {
        this.chartLabels.push(property);
        this.chartData.push((categoryToExpand[property] / totalExpand * 100));
      }
    }
  }

  private getLastSixMonths(){
    for(let i = 6; i > 0; i -= 1) {
      let d:Date = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
      let month:string = this.monthNames[d.getMonth()];
      this.LastSixMonthsArray.push(month);
      //let year:number = d.getFullYear();
      //console.log(month);
      //console.log(year);
    }
  }

  handleDropDown(dropDownName: string, selectedOption: string) {
    switch (dropDownName) {
      case "Frequency":
        if (selectedOption.toLowerCase() != 'current') {
          this.isMonthDisabled = false;
          let monthValue:string = (<HTMLSelectElement>document.getElementById('lastSixMonthsID')).value;
          this.fetchSpecificMonthTransactions(monthValue);
        } else {
          this.isMonthDisabled = true;
        }
        break;
      case "Months":
        this.fetchSpecificMonthTransactions(selectedOption);
        break;
      case "Category":
        this.TransactionsToConsider = [];
        if (selectedOption.toLowerCase() == "all") {
          this.TransactionsToConsider = this.AllTransactions;
        } else {
          this.TransactionsToConsider = this.AllTransactions.map(x => {
            if (x.category.toLowerCase() == selectedOption.toLowerCase()) {
              return x
            } else {
              return null;
            }
          }).filter(x => x != null);
        }
        break;
      default:
        break;
    }
  }

  getMonthFromString(mon) {
    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth();
    }
    return -1;
  }

  private fetchSpecificMonthTransactions(selectedMonth:string){
    let currentMonth: number = new Date().getMonth();
        let monthNumber: number = this.getMonthFromString(selectedMonth);
        let diff: number = monthNumber - currentMonth;
        if (diff < 0) {
          diff = Math.abs(diff);
        }
        this.submitMonth.emit(diff);
  }

}
