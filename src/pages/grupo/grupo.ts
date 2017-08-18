import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Grupo, GrupoDAO } from '../../domain/grupo/index';
import { AnotacoesPage } from '../anotacoes/anotacoes'

@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  grupo: Grupo = new Grupo();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _grupoDAO: GrupoDAO) {

    if (this.navParams.get('grupo'))
      this.grupo = this.navParams.get('grupo');
  }

  grava() {

    let alteracao = this.grupo.key ? true : false;

    this._grupoDAO
      .grava(this.grupo)
      .then(() => {
        console.log('Grupo gravado com sucesso.');
        if (!alteracao)
          this.navCtrl.push(AnotacoesPage, { grupo: this.grupo })
        else
          this.navCtrl.pop();
      })
      .catch(() => { console.log('Não foi possivel gravar o grupo') })

  }

}
