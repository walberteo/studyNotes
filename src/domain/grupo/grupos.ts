import { Grupo } from './grupo'

export class Grupos {

    private _grupos: Grupo[] = [];

    constructor(_grupo: Grupo[]) {
        this._grupos = _grupo ? _grupo : [];
    }

    add(grupo: Grupo) {

        if (!grupo.key) {
            grupo.key = 1
            if (this._grupos.length > 0)
                grupo.key = Math.max.apply(Math, this._grupos.map((o) => o.key)) + 1 //retorna a maior key +1
            this._grupos.push(grupo);
        } else {
            let index = this._grupos.findIndex(x => x.key == grupo.key);
            this._grupos[index] = grupo;
        }
    }

    lista(): Grupo[] {

        return this._grupos;
    }

    remove(grupo: Grupo) {

        let index = this._grupos.indexOf(grupo);
        this._grupos.splice(index, 1);
    }

}