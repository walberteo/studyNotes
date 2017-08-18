import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Grupo, GrupoDAO } from '../../domain/grupo/index';
import { GrupoPage } from '../grupo/grupo';
import { AnotacoesPage } from '../anotacoes/anotacoes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allGrupo: Grupo[];

  constructor(
    public navCtrl: NavController,
    private _grupoDAO: GrupoDAO,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) { }

  ionViewDidEnter() {

    this._grupoDAO
      .lista()
      .then((grupos: Grupo[]) => this.allGrupo = grupos)
      .catch(err => console.log(err));
  }

  adiciona() {

    this.navCtrl.push(GrupoPage);
  }

  remove(grupo: Grupo) {

    let confirm = this.alertCtrl.create({
      title: 'Deseja excluir esse grupo?',
      message: 'Ao excluir o grupo todas as notas dele também serão excluidas',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this._grupoDAO
              .remove(grupo)
              .then((grupos: Grupo[]) => this.allGrupo = grupos)
              .catch(err => console.log(err));
          }
        }
      ]
    });
    confirm.present();
  }

  altera(grupo: Grupo) {

    this.navCtrl.push(GrupoPage, { grupo: grupo });
  }

  abrir(grupo: Grupo) {
   
    this.navCtrl.push(AnotacoesPage, { grupo: grupo });
  }

  presentActionSheet(grupo: Grupo) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modificar Grupo',
      buttons: [
        {
          text: 'Excluir',
          role: 'excluir',
          icon: 'trash',
          handler: () => {
            this.remove(grupo);
          }
        }, {
          text: 'Alterar',
          role: 'alterar',
          icon: 'create',
          handler: () => {
            this.altera(grupo);
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
