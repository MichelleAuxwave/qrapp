import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ToastController, Platform } from 'ionic-angular';

import { HistorialService } from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              public toastCtrl: ToastController,
              private platform: Platform,
              private _historialService:HistorialService) {

  }

  scan(){
      console.log("Realizando Scan...");

      if(!this.platform.is('cordova')){
        this._historialService.agregar_historial( "http://google.com" );
        return;
      }

      this.barcodeScanner.scan().then(barcodeData => {
        console.log("Result: " + barcodeData.text);
        console.log("Format: " + barcodeData.format);
        console.log("Cancelled: " + barcodeData.cancelled);

        if(barcodeData.cancelled == false && barcodeData.text != null){
            this._historialService.agregar_historial( barcodeData.text );
        }

      }).catch(err => {
          console.log('Error: ', err);
          this.mostrar_error( "Error: " + err );
      });
  }

    mostrar_error( mensaje:string ) {
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 2000
      });
      toast.present();
    }

}
