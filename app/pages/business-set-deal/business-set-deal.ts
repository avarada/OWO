/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook,BarcodeScanner} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/business-set-deal/business-set-deal.html',
})
export class BusinessSetDealPage {

  http:any
  device_id:any
  uid:any
  data:any
  product_name:any
  product_image:any
  price:any
  business:any
  form:any
  barcode:any
constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

      this.http = http
      this.nav = nav
      this.device_id = Device.device.uuid
      this.uid = localStorage.getItem('owo_uid')
      this.product_name = navParams.get("product_name");
      this.product_image = navParams.get("product_image");
      this.price = navParams.get("price");
      this.business = navParams.get("business");
      this.barcode = navParams.get("barcode");
      this.form = {}
      this.data = {}

  }

  create(){

    let link = 'https://gamerholic.com/server/owo/business_set_deal.php';
    var data_post = JSON.stringify({uid: this.uid,product_name:this.product_name,product_image:this.product_image,price:this.form.price,business:this.business,barcode:this.barcode});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link, data_post,options)

    //.subscribe(data => {console.log(data._body)})

     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{
        if(data.success){
          let alert = this.alertCtrl.create({
              title: 'success',
              subTitle: 'your deal is live, it will automatically be canceled at the end of the day',
              buttons: [
                {
                    text: 'okay',
                    handler: data => {
                      this.form = {}
                      this.nav.pop();

                    }

                }              ]
            });
            alert.present();
        }else{
          let alert = this.alertCtrl.create({
              title: 'error',
              subTitle: data.message,
              buttons: [
                {
                    text: 'okay',
                    handler: data => {
                      this.form = {}
                      this.nav.pop();

                    }

                }               ]
            });
            alert.present();

        }
      })
  }

  handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
