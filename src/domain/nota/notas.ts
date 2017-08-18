import { Nota } from './nota'

export class Notas {

    private _notas: Nota[] = [];

    constructor(_nota: Nota[]) {
        this._notas = _nota ? _nota : [];
    }

    add(nota: Nota) {

        if (!nota.key) {
            nota.key = 1
            if (this._notas.length > 0)
                nota.key = Math.max.apply(Math, this._notas.map((o) => o.key)) + 1 //retorna a maior key +1
            this._notas.push(nota);
        } else {
            let index = this._notas.findIndex(x => x.key == nota.key);
            this._notas[index] = nota;
        }
    }

    lista(): Nota[] {

        return this._notas;
    }

    remove(nota: Nota) {

        let index = this._notas.indexOf(nota);
        this._notas.splice(index, 1);
    }

}