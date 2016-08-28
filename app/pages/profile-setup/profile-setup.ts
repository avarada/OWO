/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook} from 'ionic-native';
import {DashboardPage} from '../dashboard/dashboard';

@Component({
  templateUrl: 'build/pages/profile-setup/profile-setup.html',
})
export class ProfileSetupPage {

  form:any
  data:any
  uid:any
  http:any
  message:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {
    this.http = http
    this.form = {}
    this.data = {}
    this.uid = navParams.get("uid");

  }

  save(){
    let name = this.form.name
    let email = this.form.email
    let username = this.form.username
    let link = 'https://gamerholic.com/server/owo/profile-setup.php';
    var data = JSON.stringify({name:name,email:email,uid:this.uid,username:username});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(link, data,options)
    //print php error
    //.subscribe(data => {console.log(data._body)})

     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{

        if(data.success){
          let username = data.username
          setTimeout(()=>{
            this.nav.push(DashboardPage,{uid:this.uid,username:username
            });
          },1000)

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
