import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { async } from '@angular/core/testing';
import {PaymentOrder} from './paymentOrder'


declare var payex: any;

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  showCheckin: boolean = true;
  private checkinurl: string;
  consumerProfileRef: string = "";
  paymentMenuUrl: string;
  showPayButton: boolean = true;
  paymentOrder: PaymentOrder;

  constructor(
    private productService: ProductService) {
  }

  ngOnInit(): void {
    //Gets url for rendering check in
    this.productService.getCheckinUrl().subscribe(async res => {
      this.checkinurl = await res.operations[1].href;
      this.renderCheckin();
    });


  }

  getRenderPaymentMenuUrl(): void {
    this.showCheckin = false;
    //Gets the url
    this.paymentOrder = new PaymentOrder();
    this.paymentOrder.consumerProfileRef = this.consumerProfileRef;
    this.paymentOrder.catPrice = 100;
    this.productService.getPaymentMenuUrl(this.paymentOrder.consumerProfileRef).subscribe(async res => {
      this.paymentMenuUrl = await JSON.parse(res).operations.find(o => o.rel === 'view-paymentorder').href
      //Render the menu
      this.renderPaymentMenu();
    })
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

          //Render payment menu here


        },
        onShippingDetailsAvailable: function (shippingDetailsAvailableEvent) {
          console.log(shippingDetailsAvailableEvent);
        },
        style: {
          body: {
            backgroundColor: "#ede6d1",
            borderRadius: "5px",
            margin: "2px 3px 2px 3px",
            padding: "3px 2px 3px 2px"
          },
          button: {
            color: '#ffffff',
            font: "italic small-caps bold normal 14px/1.5em Verdana, Arial, Helvetica, sans-serif",
            fontSize: '18px',
            width: '200px'
          }
        }
      }).open();
    })
    document.getElementsByTagName('head')[0].appendChild(script);

  }



  renderPaymentMenu(): void {
    this.showPayButton = false;
    let script = document.createElement('script')
    script.src = this.paymentMenuUrl
    script.addEventListener("load", function (e) {
      payex.hostedView.paymentMenu({
        container: 'payment-menu',
        culture: 'nb-NO',
        onPaymentCompleted: function (paymentCompletedEvent) {
          console.log(paymentCompletedEvent);
        },
        onPaymentFailed: function (paymentFailedEvent) {
          console.log(paymentFailedEvent);
        },
        onPaymentCreated: function (paymentCreatedEvent) {
          console.log(paymentCreatedEvent);
        },
        onPaymentToS: function (paymentToSEvent) {
          console.log(paymentToSEvent);
        },
        onPaymentMenuInstrumentSelected: function (paymentMenuInstrumentSelectedEvent) {
          console.log(paymentMenuInstrumentSelectedEvent);
        },
        onError: function (error) {
          console.error(error);
        },
        style: {
          body: {
            backgroundColor: "#ede6d1",
            borderRadius: "5px",
            margin: "2px 3px 2px 3px",
            padding: "3px 2px 3px 2px"
          }
        }
      }).open();
    })
    document.getElementsByTagName('head')[0].appendChild(script);
  }



}
