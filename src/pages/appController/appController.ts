import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { tamagotchiPage } from '../tamagotchi/tamagotchi';
import { messengerPage } from '../messenger/messenger';
// Bluetooth UUIDs
const SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const TX_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
const TYPE_CHARACTERISTIC = '6E400004-B5A3-F393-E0A9-E50E24DCCA9E';

@Component({
  selector: 'page-appController',
  templateUrl: 'appController.html',
})
export class appControllerPage {

  peripheral: any = {};
  buttonState: number;
  statusMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ble: BLE,
              private alertCtrl: AlertController,
              private ngZone: NgZone) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);

      this.ble.connect(device.id).subscribe(
        peripheral => this.onConnected(peripheral,device),
        peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
      );
  }

  // the connection to the peripheral was successful
  onConnected(peripheral,device) {
    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

      // Read the current value of the type characteristic to choose view
      this.ble.read(this.peripheral.id, SERVICE, TYPE_CHARACTERISTIC).then(
        data => this.onButtonStateChange(data,device,peripheral),
        () => this.showAlert('Unexpected Error', 'Failed to get type')
      )
  }

  onButtonStateChange(buffer:ArrayBuffer, device, peripheral) {
    var data = new Uint8Array(buffer);
    console.log(data[0]);
    if(data[0]==1){
      this.navCtrl.push(messengerPage, {
        device: device,
        peripheral: peripheral
      });
    }else if(data[0]==3){
      this.navCtrl.push(tamagotchiPage, {
        device: device,
        peripheral: peripheral
      });
    }
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
