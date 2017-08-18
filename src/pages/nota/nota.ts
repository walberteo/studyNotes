import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Nota, NotaDAO } from '../../domain/nota/index'
import { Grupo } from '../../domain/grupo/index'

@Component({
  selector: 'page-nota',
  templateUrl: 'nota.html',
})
export class NotaPage {

  public nota: Nota = new Nota();
  public grupo: Grupo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _notaDAO: NotaDAO,
    private datePicker: DatePicker
  ) {

    if (navParams.get('nota'))
      this.nota = navParams.get('nota');

    this.grupo = navParams.get('grupo');
  }

  grava() {

    this._notaDAO
      .grava(this.grupo, this.nota)
      .then(() => {
        console.log('Nota gravada com sucesso.');
        this.navCtrl.pop();
      })
  }

  selecionaData() {

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      okText: 'Confirmar',
      cancelText: 'Concelar'
    }).then(
      data => this.nota.data = data.toISOString(),
      err => console.log(err))
  }

}
