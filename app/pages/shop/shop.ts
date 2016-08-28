/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook,BarcodeScanner,Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/shop/shop.html',
})
export class ShopPage {

  http:any
  username:any
  device_id:any
  uid:any
  product_image:any
  product_name:any
  inventory_count:any
  data:any
  barcode:any
  lat:any
  lng:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

    this.http = http
    this.nav = nav
    this.device_id = Device.device.uuid
    this.uid = localStorage.getItem('owo_uid')
    this.data = {}

    this.start()
  }

  start(){

    let link = 'https://gamerholic.com/server/owo/shop_products.php';
    var data_post = JSON.stringify({uid: this.uid,lat:this.lat,lng:this.lng});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link, data_post,options)

    //.subscribe(data => {console.log(data._body)})

     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{
        if(data.success){

        }else{

        }
      })


  }

  handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
