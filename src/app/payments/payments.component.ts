import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

export class PaymentModel{
  amount:number;
  date:Date;
  paymentType:string;
  category:string;
  description:string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  @Input() availableBalance:number;

  @Output() submitPayment:EventEmitter<PaymentModel> = new EventEmitter<PaymentModel>();
  
  categories = ["Grocery", "Medical", "Travel", "Loans", "Utility Bills", "Education", "Shopping", "Misc"] as const;
  paymentTypes = ["Make Payment", "Receive Payment"] as const;

  constructor() { }

  submit(f: NgForm) {
    let paymentModel: PaymentModel = new PaymentModel();
    if (f.value) {
      Object.keys(f.value).forEach(function (key, index) {
        switch (key) {
          case "amount":
            paymentModel.amount = f.value[key];
            break;
          case "date":
            paymentModel.date = f.value[key];
            break;
          case "payment_type":
            paymentModel.paymentType = f.value[key];
            break;
          case "category":
            paymentModel.category = f.value[key];
            break;
          case "description":
            paymentModel.description = f.value[key];
            break;
          default:
            break;
        }
      });
      this.submitPayment.emit(paymentModel);
    }
  }

  handlePaymentType(paymentType: string, f: NgForm) {
    if (paymentType == "Make Payment") {
      if (f.value.amount && this.availableBalance < f.value.amount) {
        alert('insufficient balance');
        f.reset();
      }
    }
  }

}
