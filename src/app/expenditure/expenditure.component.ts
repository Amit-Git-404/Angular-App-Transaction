import { Component, OnInit, Input } from '@angular/core';

export interface TransactionModel{
  txnId:string;
  desc:string;
  category:string;
  amount:number;
  debitCreditInfo:string;
}

@Component({
  selector: 'expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit {
  @Input() Transactions:TransactionModel;

  constructor() { }

  ngOnInit(): void {
  }

}
