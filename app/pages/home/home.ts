/// <reference path="../../../typings/index.d.ts" />
import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Facebook} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    http:any
    message:any
    name:any
    user:any
    device_id:any
    passcode:any
    uid:any
    form:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http) {

    this.http = http
    this.nav = nav
    this.user = {}
    this.device_id = Device.device.uuid
    this.form ={}
    this.passcode = ''


  }

  add(value){
    if(this.passcode.length<4){
       this.passcode = this.passcode + value;
    }
  };

  delete(){

    if(this.passcode.length > 0) {
       this.passcode = this.passcode.substring(0, this.passcode.length - 1);
   }
 };

 login(){

   let link = 'https://gamerholic.com/server/owo/session.php';
   var data = JSON.stringify({device_id: this.device_id,code:this.passcode});
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });

   return this.http.post(link, data,options)
   //print php error
   //.subscribe(data => {console.log(data._body)})

    //get json response
     .map(data => data.json())
     .catch(this.handleError)
     .subscribe((data) =>{
       this.uid = data.uid,
       this.name = data.name,
       this.message = data.message,
       setTimeout(()=>{

         this.get_user()

       },1000)
     }
 )


 }

  loginFB(type){
    this.platform.ready().then(() => {
      Facebook.login(["email"]).then((result) => {
        let status = result.status
        if(status=='connected'){
          let link = 'https://gamerholic.com/server/owo/session.php';
          let pass = JSON.stringify({facebook_id: result.authResponse.userID, device_id: this.device_id,type: type});
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });

          return this.http.post(link, pass,options)
          //print php error
          .subscribe(data => {console.log(data._body)})

           //get json response
            // .map(data => data.json())
            // .catch(this.handleError)
            // .subscribe((data) => this.user = data,
            //    setTimeout(()=>{
            //      //this.getUser()
            //    },1200))

        }else{
          alert(JSON.stringify(result))

        }
       })
    })
  }

  get_user(){

  }


  handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
