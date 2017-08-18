import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Grupo, GrupoDAO } from '../grupo/index';
import { Nota, Notas } from './index';

@Injectable()
export class NotaDAO {

    constructor(
        private _storage: Storage,
        private _grupoDAO: GrupoDAO) { }

    private _key(grupo) {

        return 'nota' + grupo.key
    }

    grava(grupo: Grupo, nota: Nota) {

        return this.lista(grupo)
            .then((allNota: Nota[]) => {

                let notas: Notas = new Notas(allNota);
                notas.add(nota);

                this._storage.set(this._key(grupo), notas.lista())
                    .then(() => {
                        grupo.notas = notas.lista().length
                        this._grupoDAO.grava(grupo)
                    })
                    .catch(err => console.log(err));
            });
    }

    lista(grupo: Grupo) {

        return this._storage.get(this._key(grupo))
    }

    remove(grupo: Grupo, nota: Nota) {

        return this.lista(grupo)
            .then((allNota: Nota[]) =>{

                let notas: Notas = new Notas(allNota);
                notas.remove(nota);
                
                return this._storage.set(this._key(grupo), notas.lista())
                    .then(() =>{
                        grupo.notas = notas.lista().length
                        this._grupoDAO.grava(grupo)
                        return this.lista(grupo)
                    })
                    .catch(err => console.log(err));
            })

    }
    
}