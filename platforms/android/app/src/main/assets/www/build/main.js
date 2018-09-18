webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tamagotchi_tamagotchi__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messenger_messenger__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Bluetooth UUIDs
var SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
var TX_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
var TYPE_CHARACTERISTIC = '6E400004-B5A3-F393-E0A9-E50E24DCCA9E';
var appControllerPage = /** @class */ (function () {
    function appControllerPage(navCtrl, navParams, ble, alertCtrl, ngZone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ble = ble;
        this.alertCtrl = alertCtrl;
        this.ngZone = ngZone;
        this.peripheral = {};
        var device = navParams.get('device');
        this.setStatus('Connecting to ' + device.name || device.id);
        this.ble.connect(device.id).subscribe(function (peripheral) { return _this.onConnected(peripheral, device); }, function (peripheral) { return _this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected'); });
    }
    // the connection to the peripheral was successful
    appControllerPage.prototype.onConnected = function (peripheral, device) {
        var _this = this;
        this.peripheral = peripheral;
        this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
        // Subscribe for notifications when the temperature changes
        /*this.ble.startNotification(this.peripheral.id, SERVICE, TYPE_CHARACTERISTIC).subscribe(
          data => this.onButtonStateChange(data),
          () => this.showAlert('Unexpected Error', 'Failed to subscribe for type changes')
        )*/
        // Read the current value of the temperature characteristic
        this.ble.read(this.peripheral.id, SERVICE, TYPE_CHARACTERISTIC).then(function (data) { return _this.onButtonStateChange(data, device, peripheral); }, function () { return _this.showAlert('Unexpected Error', 'Failed to get type'); });
    };
    appControllerPage.prototype.onButtonStateChange = function (buffer, device, peripheral) {
        var data = new Uint8Array(buffer);
        console.log(data[0]);
        if (data[0] == 1) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__messenger_messenger__["a" /* messengerPage */], {
                device: device,
                peripheral: peripheral
            });
        }
        else if (data[0] == 3) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tamagotchi_tamagotchi__["a" /* tamagotchiPage */], {
                device: device,
                peripheral: peripheral
            });
        }
    };
    // Disconnect peripheral when leaving the page
    /*  ionViewWillLeave() {
        console.log('ionViewWillLeave disconnecting Bluetooth');
        this.ble.disconnect(this.peripheral.id).then(
          () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
          () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
        )
      }*/
    appControllerPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    appControllerPage.prototype.setStatus = function (message) {
        var _this = this;
        console.log(message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    appControllerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-appController',template:/*ion-inline-start:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/appController/appController.html"*/'<ion-footer>\n  <ion-toolbar>\n    <p>{{ statusMessage }}</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/appController/appController.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], appControllerPage);
    return appControllerPage;
}());

//# sourceMappingURL=appController.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tamagotchiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
var TX_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
var tamagotchiPage = /** @class */ (function () {
    function tamagotchiPage(navCtrl, navParams, ble, alertCtrl, ngZone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ble = ble;
        this.alertCtrl = alertCtrl;
        this.ngZone = ngZone;
        this.peripheral = {};
        //let device = navParams.get('device');
        var peripheral = navParams.get('peripheral');
        this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
        this.ngZone.run(function () {
            _this.peripheral = peripheral;
        });
        this.ble.startNotification(peripheral.id, SERVICE, TX_CHARACTERISTIC).subscribe(function (data) { return _this.onButtonStateChange(data); }, function () { return _this.showAlert('Unexpected Error', 'Failed to subscribe for tamagotchi'); });
        this.ble.read(peripheral.id, SERVICE, TX_CHARACTERISTIC).then(function (data) { return _this.onButtonStateChange(data); }, function () { return _this.showAlert('Unexpected Error', 'Failed to get tamagotchi'); });
    }
    // the connection to the peripheral was successful
    tamagotchiPage.prototype.onConnected = function (peripheral) {
        this.peripheral = peripheral;
        /*  this.ble.read(this.peripheral.id, SERVICE, TX_CHARACTERISTIC).then(
            data => this.onButtonStateChange(data),
            () => this.showAlert('Unexpected Error', 'Failed to subscribe for tamagotchi changes')
          )*/
    };
    tamagotchiPage.prototype.onButtonStateChange = function (buffer) {
        var data = new Uint8Array(buffer);
        this.exercise = data[0];
        this.food = data[1];
        this.sleep = data[2];
        console.log(data[0] + " " + data[1] + " " + data[2]);
    };
    // Disconnect peripheral when leaving the page
    tamagotchiPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        console.log('ionViewWillLeave disconnecting Bluetooth');
        this.ble.disconnect(this.peripheral.id).then(function () { return console.log('Disconnected ' + JSON.stringify(_this.peripheral.characteristics[3].characteristic)); }, function () { return console.log('ERROR disconnecting ' + JSON.stringify(_this.peripheral)); });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {});
    };
    tamagotchiPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    tamagotchiPage.prototype.setStatus = function (message) {
        var _this = this;
        console.log(message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    tamagotchiPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tamagotchi',template:/*ion-inline-start:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/tamagotchi/tamagotchi.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>tamagochi</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="padding">\n  <ion-list>\n    <ion-list-header>\n      Exercise\n      <ion-badge item-end>{{exercise}}</ion-badge>\n    </ion-list-header>\n  <ion-item>\n    <ion-range min="0" max="100" [(ngModel)]="exercise" color="secondary">\n      <ion-label range-left>-0</ion-label>\n      <ion-label range-right>100</ion-label>\n    </ion-range>\n  </ion-item>\n  <ion-list-header>\n    Food\n    <ion-badge item-end >{{food}}</ion-badge>\n  </ion-list-header>\n  <ion-item>\n    <ion-range min="0" max="100" [(ngModel)]="food" color="secondary">\n      <ion-label range-left>-0</ion-label>\n      <ion-label range-right>100</ion-label>\n    </ion-range>\n  </ion-item>\n  <ion-list-header>\n    Sleep\n    <ion-badge item-end>{{sleep}}</ion-badge>\n  </ion-list-header>\n  <ion-item>\n    <ion-range min="0" max="100" [(ngModel)]="sleep" color="secondary">\n      <ion-label range-left>-0</ion-label>\n      <ion-label range-right>100</ion-label>\n    </ion-range>\n  </ion-item>\n\n</ion-list>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <p>{{ statusMessage }}</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/tamagotchi/tamagotchi.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], tamagotchiPage);
    return tamagotchiPage;
}());

//# sourceMappingURL=tamagotchi.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return messengerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
var TX_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';
var RX_CHARACTERISTIC = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
var messengerPage = /** @class */ (function () {
    function messengerPage(navCtrl, navParams, ble, alertCtrl, ngZone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ble = ble;
        this.alertCtrl = alertCtrl;
        this.ngZone = ngZone;
        this.peripheral = {};
        //let device = navParams.get('device');
        var peripheral = navParams.get('peripheral');
        this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
        this.ngZone.run(function () {
            _this.peripheral = peripheral;
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
    messengerPage.prototype.str2ab = function (str) {
        var buf = new ArrayBuffer(str.length * 2);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };
    messengerPage.prototype.ab2str = function (buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
    };
    // the connection to the peripheral was successful
    messengerPage.prototype.onConnected = function (peripheral) {
        //this.setStatus('Connected to ' + (peripheral.name || peripheral.id) + " "+peripheral.characteristics[3].service);
        /*this.ble.startNotification(this.peripheral.id, SERVICE, TX_CHARACTERISTIC).subscribe(
          data => this.onButtonStateChange(data),
          () => this.showAlert('Unexpected Error', 'Failed to subscribe for messenger')
        )*/
    };
    messengerPage.prototype.readVal = function (event) {
        var _this = this;
        this.ble.read(this.peripheral.id, SERVICE, TX_CHARACTERISTIC).then(function (data) { return _this.onButtonStateChange(data); }, function () { return _this.showAlert('Unexpected Error', 'Failed to read message'); });
    };
    messengerPage.prototype.writeMsg = function (event) {
        var _this = this;
        console.log("sending");
        console.log(this.inputValue);
        this.ble.write(this.peripheral.id, SERVICE, RX_CHARACTERISTIC, this.str2ab(this.inputValue)).then(function () { return _this.setStatus("Message delivered"); }, function (e) { return _this.showAlert('Unexpected Error', 'Failed sending message ' + e); });
        this.inputValue = "";
    };
    messengerPage.prototype.onButtonStateChange = function (buffer) {
        //var data = new Uint8Array(buffer);
        console.log(this.ab2str(buffer));
        this.savedValue = this.ab2str(buffer);
        //this.ngZone.run(() => {
        //this.buttonState = data[0];
        //});
    };
    // Disconnect peripheral when leaving the page
    messengerPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        console.log('ionViewWillLeave disconnecting Bluetooth');
        this.ble.disconnect(this.peripheral.id).then(function () { return console.log('Disconnected ' + JSON.stringify(_this.peripheral.characteristics[3].characteristic)); }, function () { return console.log('ERROR disconnecting ' + JSON.stringify(_this.peripheral)); });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {});
    };
    messengerPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    messengerPage.prototype.setStatus = function (message) {
        var _this = this;
        console.log(message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    messengerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messenger',template:/*ion-inline-start:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/messenger/messenger.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>BLE Messenger</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="ionViewWillLeave()">\n        Disconnect\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="padding">\n  <h1 id="dataDisplay">{{savedValue?savedValue:"Nothing yet..."}}</h1>\n  <div id="statusDiv">{{peripheral.name?peripheral.name:"not connected"}}</div>\n  <ion-list>\n    <label class="item item-input">\n        <ion-input type="text" [(ngModel)]="inputValue"></ion-input>\n    </label>\n  </ion-list>\n  <button class="base primary button-block" (click)="writeMsg($event)" >send </button>\n  <button class="base primary button-block" (click)="readVal($event)" >read </button>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <p>{{ statusMessage }}</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/messenger/messenger.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], messengerPage);
    return messengerPage;
}());

//# sourceMappingURL=messenger.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_progressbar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_appController_appController__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tamagotchi_tamagotchi__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_messenger_messenger__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_button_state_description_button_state_description__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_appController_appController__["a" /* appControllerPage */],
                __WEBPACK_IMPORTED_MODULE_12__pipes_button_state_description_button_state_description__["a" /* ButtonStateDescriptionPipe */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tamagotchi_tamagotchi__["a" /* tamagotchiPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_messenger_messenger__["a" /* messengerPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6_ng2_progressbar__["a" /* NgProgressModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_appController_appController__["a" /* appControllerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tamagotchi_tamagotchi__["a" /* tamagotchiPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_messenger_messenger__["a" /* messengerPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__["a" /* BLE */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonStateDescriptionPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the ButtonStateDescriptionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ButtonStateDescriptionPipe = /** @class */ (function () {
    function ButtonStateDescriptionPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ButtonStateDescriptionPipe.prototype.transform = function (buttonState) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var description;
        // TODO get code from SensorTag for multiple buttons
        if (buttonState === 0) {
            description = 'Button is Released';
        }
        else if (buttonState) {
            description = 'Button is Pressed';
        }
        else {
            description = 'Button State is Unknown';
        }
        return description;
    };
    ButtonStateDescriptionPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'buttonStateDescription',
        })
    ], ButtonStateDescriptionPipe);
    return ButtonStateDescriptionPipe;
}());

//# sourceMappingURL=button-state-description.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appController_appController__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, toastCtrl, ble, ngZone) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.ble = ble;
        this.ngZone = ngZone;
        this.devices = [];
    }
    HomePage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter');
        this.scan();
    };
    HomePage.prototype.scan = function () {
        var _this = this;
        this.setStatus('Scanning for Bluetooth LE Devices');
        this.devices = []; // clear list
        this.ble.scan([], 5).subscribe(function (device) { return _this.onDeviceDiscovered(device); }, function (error) { return _this.scanError(error); });
        setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    };
    HomePage.prototype.onDeviceDiscovered = function (device) {
        var _this = this;
        console.log('Discovered ' + device.name + " " + device.characteristic_uuid + " " + device.service_uuid);
        this.ngZone.run(function () {
            _this.devices.push(device);
        });
    };
    // If location permission is denied, you'll end up here
    HomePage.prototype.scanError = function (error) {
        this.setStatus('Error ' + error);
        var toast = this.toastCtrl.create({
            message: 'Error scanning for Bluetooth low energy devices',
            position: 'middle',
            duration: 5000
        });
        toast.present();
    };
    HomePage.prototype.setStatus = function (message) {
        var _this = this;
        console.log(message);
        this.ngZone.run(function () {
            _this.statusMessage = message;
        });
    };
    HomePage.prototype.deviceSelected = function (device) {
        console.log(JSON.stringify(device) + ' selected');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__appController_appController__["a" /* appControllerPage */], {
            device: device
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      BLE Connect\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="scan()">\n        Scan\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="welcomeImg"><ion-icon name="planet"></ion-icon></div>\n		<div class="welcomeText wt1">Welcome to our space voyage! Select you BLE device</div>\n		<!--<div class="welcomeText wt2">\n			There are a few exercises you can do with this app\n		</div>\n		<ul class="welcomeText wt3">\n			<li>BLE Messenger</li>\n			<li>Value Display</li>\n			<li>Custom Control</li>\n			<li>ZaZZ the Alien</li>\n			<li>Space Rover</li>\n		</ul>-->\n    <ion-list>\n    <button ion-item *ngFor="let device of devices" (click)="deviceSelected(device)">\n      <h2>{{ device.name || \'Unnamed\' }}</h2>\n      <p>{{ device.id }}</p>\n      <p>{{ device.service_uuid }}</p>\n      <p>RSSI: {{ device.rssi }}</p>\n    </button>\n</ion-list>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <p>{{ statusMessage }}</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/carlos/cordovaApps/CTC_app/ctc-advanced-technolgies/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map