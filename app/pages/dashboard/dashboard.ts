/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook} from 'ionic-native';
import {ProfileSetupPage} from '../profile-setup/profile-setup';
import {BusinessSetupPage} from '../business-setup/business-setup';
import {BusinessPage} from '../business/business';
import {BusinessDailDealPage} from '../business-dail-deal/business-dail-deal';

@Component({
  templateUrl: 'build/pages/dashboard/dashboard.html',
})
export class DashboardPage {

    http:any
    username:any
    user:any
    device_id:any
    uid:any
    data:any
    has_business:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

        this.http = http
        this.nav = nav
        this.user = {}
        this.device_id = Device.device.uuid
        this.uid = localStorage.getItem('owo_uid')
        this.has_business = navParams.get("has_business");

  }

  business_setup(){

    if(this.has_business>0){

      this.nav.push(BusinessPage,{uid: this.uid
      });

    }else{
      this.nav.push(BusinessSetupPage,{uid: this.uid
      });

    }
  }

}
