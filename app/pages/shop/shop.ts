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
  geo_loading:any
  myAddress:any
  city:any
  state:any
  county:any
  zip:any
  country:any
  deals:any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public alertCtrl: AlertController) {

    this.http = http
    this.nav = nav
    this.device_id = Device.device.uuid
    this.uid = localStorage.getItem('owo_uid')
    this.data = {}
    //this.initializeMap()
    this.start()
  }

  // initializeMap(){
  //
  //     this.geo_loading = 1
  //     Geolocation.getCurrentPosition().then(pos => {
  //       this.lat = pos.coords.latitude
  //       this.lng = pos.coords.longitude
  //
  //       let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  //       let geocoder = new google.maps.Geocoder();
  //       var request = {
  //         latLng: latLng
  //       };
  //       geocoder.geocode(request, (data, status) => {
  //         if (status == google.maps.GeocoderStatus.OK) {
  //           if (data[0] != null) {
  //             //console.log(data[0])
  //               this.myAddress = data[0].formatted_address
  //               this.city = data[0].address_components[2].long_name
  //               this.county = data[0].address_components[3].long_name
  //               this.state = data[0].address_components[4].short_name
  //               this.zip = data[0].address_components[6].short_name
  //               this.country = data[0].address_components[5].short_name
  //               this.geo_loading = 0
  //               this.start()
  //           }
  //         }else{
  //
  //           this.geo_loading = 0
  //
  //           // let alert = Alert.create({
  //           //     title: '<p class="text-center">Geo Location Error</p>',
  //           //     subTitle: '<p class="text-center">Your geo location settings may be turned off, please turn on<br>Make sure your location settings are turned on</p>',
  //           //     buttons: ['OK']
  //           // });
  //           // this.nav.present(alert);
  //
  //         }
  //       })
  //
  //     });
  //
  //     let watch = Geolocation.watchPosition().subscribe(pos => {
  //       this.lat = pos.coords.latitude
  //       this.lng = pos.coords.longitude
  //     });
  //
  // }
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
        console.log(JSON.stringify(data))
        if(data.success){
          this.deals = data
        }else{

        }
      })


  }

  handleError(error){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
