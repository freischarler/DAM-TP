import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicion } from '../model/Medicion'
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

const API_URL="http://localhost:3000"


@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  //urlApi="http://localhost:3000";
  asyncMedicion:Medicion;
  asyncMediciones:Medicion[];
  

  constructor(private _http: HttpClient ) {
   }

  /*async getMedicionByIdDispositivo(id):Promise<Medicion>{     
    return this._http.get(this.urlApi+"/api/medicion/"+id).toPromise().then((med:Medicion)=>{
      return med;
    });*/
  
  /*getMedicionByIdDispositivo(id): Observable<Medicion>{
    return this._http.get<Medicion>(API_URL + '/api/medicion/'+id);
    
  }*/

  async getMedicionByIdDispositivo(id): Promise<Medicion>{
    this.asyncMedicion=await this._http.get<Medicion>(API_URL + '/api/medicion/'+id).toPromise();
    return this.asyncMedicion;
  }

  async getMedicionesByIdDispositivo(id): Promise<Medicion[]>{     
    this.asyncMediciones=await this._http.get<Medicion[]>(API_URL + '/api/medicion/'+id+'/todas').toPromise();
    return this.asyncMediciones;
  }

  agregarMedicion(dispositivoId:number,valor,fecha): Observable<any> {
    
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    
    const paquete = {
      fecha,
      valor,
      dispositivoId
    };

    const body=JSON.stringify(paquete);

    //console.log(body);
    return this._http.post(API_URL + '/api/medicion/agregar', body,{'headers':headers});

    //return await this._http.post(API_URL+"/api/medicion/agregar",{body}).toPromise;  
  }
}
