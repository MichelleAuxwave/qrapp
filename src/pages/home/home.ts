import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              public toastCtrl: ToastController) {

  }

  scan(){
      console.log("Realizando Scan...");

      this.barcodeScanner.scan().then(barcodeData => {

        console.log("Result: " + barcodeData.text);
        console.log("Format: " + barcodeData.format);
        console.log("Cancelled: " + barcodeData.cancelled);

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
