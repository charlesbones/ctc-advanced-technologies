import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { HomePage } from '../home/home';

const SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const TX_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

@Component({
  selector: 'page-tamagotchi',
  templateUrl: 'tamagotchi.html',
})
export class tamagotchiPage {

  peripheral: any = {};
  statusMessage: string;
  public exercise:any;
  public food:any;
  public sleep:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ble: BLE,
              private alertCtrl: AlertController,
              private ngZone: NgZone) {

    //let device = navParams.get('device');
    let peripheral= navParams.get('peripheral');
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
    this.ngZone.run(() => {
      this.peripheral = peripheral;
    });
    this.ble.startNotification(peripheral.id, SERVICE, TX_CHARACTERISTIC).subscribe(
      data => this.onButtonStateChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to subscribe for tamagotchi')
    )
    this.ble.read(peripheral.id, SERVICE, TX_CHARACTERISTIC).then(
      data => this.onButtonStateChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to get tamagotchi')
    )
  }
  // the connection to the peripheral was successful
  onConnected(peripheral) {
    this.peripheral = peripheral;
    /*  this.ble.read(this.peripheral.id, SERVICE, TX_CHARACTERISTIC).then(
        data => this.onButtonStateChange(data),
        () => this.showAlert('Unexpected Error', 'Failed to subscribe for tamagotchi changes')
      )*/
  }

  onButtonStateChange(buffer:ArrayBuffer) {
    var data=new Uint8Array(buffer);
    this.exercise=data[0];
    this.food=data[1];
    this.sleep=data[2];
    console.log(data[0]+" "+data[1]+" "+data[2]);
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral.characteristics[3].characteristic)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
    this.navCtrl.push(HomePage, {

    });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}
