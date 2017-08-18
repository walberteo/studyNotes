import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Grupo, Grupos } from './index';

@Injectable()
export class GrupoDAO {

    constructor(private _storage: Storage) { }

    grava(grupo: Grupo) {

        return this.lista()
            .then((allGrupo: Grupo[]) => {

                let grupos: Grupos = new Grupos(allGrupo);
                grupos.add(grupo);

                this._storage.set('allGrupo', grupos.lista());
            });
    }

    lista() {

        return this._storage.get('allGrupo');
    }

    remove(grupo: Grupo) {

        return this.lista()
        .then((allGrupo: Grupo[]) => {

            let grupos: Grupos = new Grupos(allGrupo);
            grupos.remove(grupo);

            this._storage.remove('nota' + grupo.key);
            return this._storage.set('allGrupo', grupos.lista());
        });
    }

}