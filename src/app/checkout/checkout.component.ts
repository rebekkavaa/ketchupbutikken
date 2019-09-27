import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { async } from '@angular/core/testing';
import { Alert } from 'selenium-webdriver';


declare var payex: any;

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  showCheckin: boolean = true;
  private checkinurl: string;
  
 
  
  

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

  


  renderCheckin(): void {
    let script = document.createElement('script');
    script.src = this.checkinurl;
    script.addEventListener("load", function (e) {
      payex.hostedView.consumer({
        container: "checkin",
        culture: 'nb-NO',
        onConsumerIdentified: function (consumerIdentifiedEvent) {
          console.log(consumerIdentifiedEvent);


          var request = new XMLHttpRequest();
          request.addEventListener('load', (e) => {
            let res = JSON.parse(request.responseText);
            console.log(res)
            let renderPaymentMenuUrl = JSON.parse(res).operations.find(((o) => o.rel === 'view-paymentorder')).href
            let script = document.createElement('script');
            script.src = renderPaymentMenuUrl;
            script.onload = () => {
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
            };
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
          })

          request.open('POST', 'https://localhost:44307/api/Checkout/', true);
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
          request.send(JSON.stringify(consumerIdentifiedEvent.consumerProfileRef));


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
            color: '#green',
            font: "italic small-caps bold normal 14px/1.5em Verdana, Arial, Helvetica, sans-serif",
            fontSize: '18px',
            width: '200px'
          },
          label: {
            backgroundColor: "#ede6d1",
          }
        }
      }).open();
    })
    document.getElementsByTagName('head')[0].appendChild(script);
  }






}
