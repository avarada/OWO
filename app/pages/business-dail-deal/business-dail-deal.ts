/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook,BarcodeScanner} from 'ionic-native';
import {BusinessPage} from '../business/business';
import {BusinessSetDealPage} from '../business-set-deal/business-set-deal';


@Component({
  templateUrl: 'build/pages/business-dail-deal/business-dail-deal.html',
})
export class BusinessDailDealPage {

  http:any
  username:any
  device_id:any
  uid:any
  data:any
  inventory:any
  count:any

constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

      this.http = http
      this.nav = nav
      this.device_id = Device.device.uuid
      this.data = {}
      this.inventory = {}
      this.uid = localStorage.getItem('owo_uid')
      this.start()
  }

  start(){

    let link = 'https://gamerholic.com/server/owo/inventory.php';
    var data_post = JSON.stringify({uid: this.uid});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link, data_post,options)

    //.subscribe(data => {console.log(data._body)})

     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{
        console.log(JSON.stringify(data))
        if(data.success){
          this.inventory = data,
          this.count = data.count
        }else{

        }
      })


  }

  setDeal(product_name,product_image,price,business,barcode){
    //console.log(product_name,product_image,price,business,barcode)
    this.nav.push(BusinessSetDealPage,{
      uid:this.uid,
      product_name:product_name,
      product_image:product_image,
      pice:price,
      business:business,
      barcode:barcode
    });

  }

  handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
