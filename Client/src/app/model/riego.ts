export class Riego{
    
    private _logRiegoId: number;
    private _apertura: number; 
    private _fecha: string;
    private _electrovalvulaId: number;

    constructor(logRiegoId,apertura,fecha,electrovalvulaId){
        this._logRiegoId=logRiegoId;
        this._apertura=apertura;
        this._fecha=fecha;
        this._electrovalvulaId=electrovalvulaId;
    }

    public get apertura(): number {
        return this._apertura;
    }

    public get fecha(): string {    
        return this._fecha;
    }

    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }

    public set fecha(value: string ) {
        this._fecha = value;
    }

    public set logRiegoId(value: number){
        this._logRiegoId=value;
    }

    public set apertura(value: number) {
        this._apertura = value;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }
}

