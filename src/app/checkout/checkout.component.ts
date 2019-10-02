import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cat } from '../shared/productlist/Cat'


declare var payex: any;

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  private checkinurl: string;
  cat: Cat;
  

  constructor(
    private productService: ProductService) {
  }

  ngOnInit(): void {
    //Gets url for rendering check in
    this.cat = this.productService.cat;
    this.productService.getCheckinUrl().subscribe(async res => {

      this.checkinurl = await res.operations[1].href;
      this.renderCheckin(this.cat);
      
    });
  }

  renderCheckin(cat: Cat): void {

    let script = document.createElement('script');
    script.src = this.checkinurl;
    script.addEventListener("load", function (e) {
      payex.hostedView.consumer({
        container: "checkin",
        culture: 'nb-NO',
        onConsumerIdentified: function (consumerIdentifiedEvent) {
          cat.consumerProfileRef = consumerIdentifiedEvent.consumerProfileRef;
          console.log(consumerIdentifiedEvent);
          var request = new XMLHttpRequest();
          request.addEventListener('load', (e) => {
            let res = JSON.parse(request.responseText);
            let renderPaymentMenuUrl = JSON.parse(res).operations.find(((o) => o.rel === 'view-paymentorder')).href
            let script = document.createElement('script');
            script.src = renderPaymentMenuUrl;
            script.onload = () => {

              payex.hostedView.paymentMenu({
                container: 'payment-menu',
                culture: 'nb-NO',
                onPaymentCompleted: function (paymentCompletedEvent) {
                  console.log('Payment success')
                  console.log(paymentCompletedEvent);
                  window.location.replace(paymentCompletedEvent.redirectUrl)
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
                    backgroundColor: "transparent",
                  },
                  input: {
                    backgroundColor: "black",
                    focus: {
                      border: 'green'
                    },
                    invalid: {
                      border: 'red'
                    }
                  },
                  button: {
                    color: '#fff',
                    backgroundColor: '#7200f5',
                    font: "Arial",
                    fontSize: '18px',
                    width: '200px'
                  },
                  secondaryButton: {
                    color: '#fff',
                    backgroundColor: '#7200f5',
                    font: "Arial",
                    fontSize: '18px',
                    width: '200px',
                  },
                 
                }
              }).open();
            };
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
          })
          
          request.open('POST', 'https://localhost:44307/api/Checkout/', true);
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
          request.send(JSON.stringify(cat));

        },
        onShippingDetailsAvailable: function (shippingDetailsAvailableEvent) {
          console.log('shipping detail event: ' +shippingDetailsAvailableEvent);
        },
        style: {
          body: {
            backgroundColor: "transparent",
            borderRadius: "5px",
            margin: "2px 3px 2px 3px",
            padding: "3px 2px 3px 2px",
          },
          button: {
            color: '#fff',
            backgroundColor: '#7200f5',
            font: "Arial",
            fontSize: '18px',
            width: '200px',
          },
          label: {
            backgroundColor: "#fd94ff",
            padding: '5px',
            margin: '2px'
          },
        }
      }).open();
    })
    
    document.getElementsByTagName('head')[0].appendChild(script);
    
  }






}
