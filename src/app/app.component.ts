import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionModel } from './expenditure/expenditure.component';
import { PaymentModel } from './payments/payments.component';

export enum TransactionsToGet {
  recentTransaction,
  pastOneMonth,
  pastSecondMonth,
  pastThirdMonth,
  pastFourthMonth,
  pastFifthMonth,
  pastSixthMonth
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string = 'http://localhost:3000/user/123';
  title = 'assignmentApp';
  allTransactionsOfUser: TransactionModel[] = [];
  totalBalance: number;
  transactionGroupId: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.url).subscribe((data) => {
      let response: any = data;
      if (response) {
        this.transactionGroupId = response.transactionGroupId;
        this.totalBalance = response.availableBalance;
        this.getTransactions(TransactionsToGet.recentTransaction);
      }
    });
  }

  submitPayment(paymentData: PaymentModel) {
    let response: any;
    let debitCreditInfo: string = paymentData.paymentType == "Make Payment" ? "D" : "C";
    let transactionToUpdate: TransactionModel = { txnId: "Tx_156", amount: paymentData.amount, category: paymentData.category, desc: paymentData.description, debitCreditInfo };
    let userInfo = { "availableBalance": 3000 };
    this.http.patch(this.url, { "transactions": transactionToUpdate }).subscribe((data) => response = Object.assign({}));
  }

  getTransactions(transactionsToGet: TransactionsToGet) {
    if (transactionsToGet != -1 && this.transactionGroupId) {
      let url: string = this.url + '/' + transactionsToGet + '?id=' + this.transactionGroupId;
      this.http.get(url).subscribe((data) => {
        let response: any = data;
        if (response) {
          this.allTransactionsOfUser = response[0].data;
        }
      });
    }
  }

  fetchMonthTransactions(monthToGet:number){
    let transactionToGet:TransactionsToGet = TransactionsToGet[TransactionsToGet[monthToGet]];
    if(transactionToGet)
    this.getTransactions(transactionToGet);
  }
}
