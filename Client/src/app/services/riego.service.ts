import { Injectable } from '@angular/core';
import { Riego } from '../model/riego';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const API_URL="http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  ResultRiegos:Riego[];
  ResultEstado:Riego;
  Estado:number=0;

  constructor( private _http: HttpClient ) { }

  addEstado(apertura:number, electrovalvulaId,fecha:string): Observable<any> {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    const paquete = {
      apertura,
      fecha,
      electrovalvulaId
    };

    const body=JSON.stringify(paquete);
    
    //console.log(body);
    return this._http.post(API_URL + '/api/riego/agregar', body,{'headers':headers});
  }

  
  async getRiegosByIdElectrovalvula(id): Promise<Riego[]>{     
    this.ResultRiegos=await this._http.get<Riego[]>(API_URL + '/api/riego/'+id+'/todas').toPromise();
    //console.log (this.ResultRiegos);
    return this.ResultRiegos;
  }

  async getEstadoByIdElectrovalvula(id): Promise<number>{     
    this.ResultEstado=await this._http.get<Riego>(API_URL + '/api/riego/'+id).toPromise();
    if(this.ResultEstado){
      this.Estado=this.ResultEstado.apertura;
    }
    return this.Estado;
  }

  async getRiegoByIdElectrovalvula(id): Promise<Riego>{     
    return this.ResultEstado=await this._http.get<Riego>(API_URL + '/api/riego/'+id).toPromise();
  }


}
