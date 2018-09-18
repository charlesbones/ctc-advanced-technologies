import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { HomePage } from '../home/home';
const SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const TX_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
const RX_CHARACTERISTIC = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';

@Component({
  selector: 'page-messenger',
  templateUrl: 'messenger.html',
})
export class messengerPage {

  peripheral: any = {};
  buttonState: number;
  statusMessage: string;
  public inputValue:any;
  public savedValue:any;
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
    /*this.ble.startNotification(peripheral.id, SERVICE, TX_CHARACTERISTIC).subscribe(
      peripheral => this.onConnected(peripheral),
      () => this.showAlert('Unexpected Error', 'Failed to subscribe for messenger')
    )*/
    //this.setStatus('Connecting to ' + device.name || device.id);
    /*this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );*/

  }

  str2ab(str) {
      var buf = new ArrayBuffer(str.length*2);
      var bufView = new Uint8Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
  }
  ab2str(buff){
        return String.fromCharCode.apply(null, new Uint8Array(buff));
  }
  // the connection to the peripheral was successful
  onConnected(peripheral) {


    //this.setStatus('Connected to ' + (peripheral.name || peripheral.id) + " "+peripheral.characteristics[3].service);
    /*this.ble.startNotification(this.peripheral.id, SERVICE, TX_CHARACTERISTIC).subscribe(
      data => this.onButtonStateChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to subscribe for messenger')
    )*/
  }
  readVal(event){
    this.ble.read(this.peripheral.id, SERVICE, TX_CHARACTERISTIC).then(
      data => this.onButtonStateChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to read message')
    )
  }
  writeMsg(event){
    console.log("sending");
    console.log(this.inputValue);
    this.ble.write(this.peripheral.id, SERVICE, RX_CHARACTERISTIC,this.str2ab(this.inputValue)).then(
      () => this.setStatus("Message delivered"),
      e => this.showAlert('Unexpected Error', 'Failed sending message '+e)
    )
    this.inputValue="";
  }
 onButtonStateChange(buffer:ArrayBuffer) {
    //var data = new Uint8Array(buffer);
    console.log(this.ab2str(buffer));

    this.savedValue=this.ab2str(buffer);
    //this.ngZone.run(() => {
      //this.buttonState = data[0];
    //});

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
