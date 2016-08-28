/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook} from 'ionic-native';
import {ProfileSetupPage} from '../profile-setup/profile-setup';

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

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

        this.http = http
        this.nav = nav
        this.user = {}
        this.device_id = Device.device.uuid

  }

}
