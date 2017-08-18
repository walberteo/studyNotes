import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Grupo } from '../../domain/grupo/index';
import { Nota, NotaDAO } from '../../domain/nota/index';
import { NotaPage } from '../nota/nota';

@Component({
  selector: 'page-anotacoes',
  templateUrl: 'anotacoes.html',
})
export class AnotacoesPage {

  public grupo: Grupo = new Grupo();
  public notas: Nota[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _notaDAO: NotaDAO,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {

    this.grupo = this.navParams.get('grupo');

    if (this.navCtrl.length() == 2)
      this.navCtrl.remove(1, 1);
  }

  ionViewDidEnter() {

    this._notaDAO
      .lista(this.grupo)
      .then(notas => {
        this.notas = notas
      })
      .catch(err => console.error(err));

  }

  adiciona() {

    this.navCtrl.push(NotaPage, { grupo: this.grupo })
  }

  remove(nota: Nota) {

    let confirm = this.alertCtrl.create({
      title: 'Deseja excluir essa nota?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this._notaDAO
              .remove(this.grupo, nota)
              .then((notas: Nota[]) => this.notas = notas)
              .catch(err => console.log(err));
          }
        }
      ]
    });
    confirm.present();
  }

  abrir(nota: Nota) {

    this.navCtrl.push(NotaPage, { grupo: this.grupo, nota: nota });
  }

  dataFormatada(data) {
    let date: string = '';

    if (data) {
      date = new Date(data).toLocaleString('pt-BR')
      date = date.substr(0, 10);
    }

    return date
  }

  menuOpcao(nota: Nota) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modificar Nota',
      buttons: [
        {
          text: 'Excluir',
          role: 'excluir',
          icon: 'trash',
          handler: () => {
            this.remove(nota);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
