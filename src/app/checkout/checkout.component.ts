import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

declare var payex: any;

@Component({
  templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {
  private checkinurl: string;

  checkinRef: string = ""
  payhref: string

  constructor(
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getRenderURL();
  }

  renderCheckin(): void {
    let script = document.createElement('script');
    script.src = this.checkinurl;
    script.addEventListener("load", function (e) {
      payex.hostedView.consumer({
        container: "checkin",
        culture: 'nb-NO',
        onConsumerIdentified: function (consumerIdentifiedEvent) {
          console.log(consumerIdentifiedEvent);
          this.checkinRef = consumerIdentifiedEvent.consumerProfileRef
        },
        onShippingDetailsAvailable: function (shippingDetailsAvailableEvent) {
          console.log(shippingDetailsAvailableEvent);
        },
      }).open();

    })
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  getRenderURL(): void {
    this.productService.getCheckinUrl().subscribe((res) => {
      this.checkinurl = res.operations[1].href
    })
  }


  onPay(): void {
    this.renderCheckin();
  }

  onPayment(): void {
    this.getRenderPaymentMenuUrl(this.checkinRef)
  }


  renderMenu(): void {
    let script = document.createElement('script')
    script.src = this.payhref
    console.log("En gang")
    script.addEventListener("load", function (e) {
      payex.hostedView.paymentMenu({
        container: 'payment-menu',
        culture: 'nb-NO'
      }).open();
    })
    document.getElementsByTagName('head')[0].appendChild(script);
  }


  getRenderPaymentMenuUrl(consumerProfileRef: string): void {
    this.productService.getPaymentMenuUrl(consumerProfileRef).subscribe((res) => {
      let result = JSON.parse(res)
      this.payhref = result.operations[3].href
      console.log('payment menu url ffs' + this.payhref)
    })
  }
}
