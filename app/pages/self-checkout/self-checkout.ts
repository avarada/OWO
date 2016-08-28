/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook,BarcodeScanner,Geolocation} from 'ionic-native';
import {PayPage} from '../pay/pay';

@Component({
  templateUrl: 'build/pages/self-checkout/self-checkout.html',
})
export class SelfCheckoutPage {

  form:any
  data:any
  uid:any
  http:any
  barcode:any
  product_image:any
  product_name:any
  inventory_count:any
  total:any
  price:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {
    this.http = http
    this.form = {}
    this.data = {}
    this.uid = navParams.get("uid");

  }

  scan(){

    BarcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log(JSON.stringify(barcodeData))
     if(barcodeData.text){

       this.barcode = barcodeData.text

       let link = 'https://gamerholic.com/server/owo/self_checkout_scan.php';
       var data_post = JSON.stringify({uid: this.uid, barcode:barcodeData.text});
       let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });

       return this.http.post(link, data_post,options)
       //.subscribe(data => {console.log(data._body)})

        //get json response
         .map(data => data.json())
         .catch(this.handleError)
         .subscribe((data) => {
           if(data.success){
             console.log(JSON.stringify(data))
             this.product_image = data.product_image,
             this.product_name = data.product_name,
             this.total = data.total,
             this.price = data.price

           }else{
             let alert = this.alertCtrl.create({
                 title: 'error',
                 subTitle: 'item not in our database',
                 buttons: ['OK']
               });
               alert.present();

           }
         })
         //
     }
    }, (err) => {
        // An error occurred
    });

  }

  cart(){

    this.product_image =''
    this.product_name = ''
    this.price = ''
    
  }

  handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
