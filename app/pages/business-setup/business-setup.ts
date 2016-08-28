/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/business-setup/business-setup.html',
})
export class BusinessSetupPage {

  form:any
  data:any
  uid:any
  http:any
  message:any
  business_phone:any
  business_address:any
  business_image:any
  business_rating:any
  business_name:any
  business_zip:any
  business_city:any
  business_state:any
  data_post:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

    this.http = http
    this.form = {}
    this.data = {}
    this.data_post = {}
    this.uid = navParams.get("uid");


  }

  yelp(){

    let link = 'https://gamerholic.com/server/owo/yelp.php';
    var data_post = JSON.stringify({uid: this.uid,yelp:this.form.yelp});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link, data_post,options)
    //print php error
    //.subscribe(data => {console.log(data._body)})

     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{
        if(data.success){
            //console.log(JSON.stringify(data.business_phone))
          this.business_phone = data.business_phone
          this.business_address = data.business_address,
          this.business_image = data.business_image,
          this.business_rating = data.business_rating,
          this.business_name = data.business_name
          this.business_city = data.business_city
          this.business_state = data.business_state
          this.business_zip = data.business_zip

        }else{

          let alert = this.alertCtrl.create({
              title: 'error',
              subTitle: data.message,
              buttons: ['OK']
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
