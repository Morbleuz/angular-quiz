export class Reponse{
    constructor(
        public  index : number,
        public reponse : string,
        public bonne_reponse : boolean,
        public est_selectionner : boolean = false)
        {}
}
