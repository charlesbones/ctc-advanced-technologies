import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BLE } from '@ionic-native/ble';
import { NgProgressModule } from 'ng2-progressbar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { appControllerPage } from '../pages/appController/appController';
import { tamagotchiPage } from '../pages/tamagotchi/tamagotchi';
import { messengerPage } from '../pages/messenger/messenger';
import { ButtonStateDescriptionPipe } from '../pipes/button-state-description/button-state-description';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    appControllerPage,
    ButtonStateDescriptionPipe,
    tamagotchiPage,
    messengerPage
  ],
  imports: [
    BrowserModule,
    NgProgressModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    appControllerPage,
    tamagotchiPage,
    messengerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE
  ]
})
export class AppModule {}
