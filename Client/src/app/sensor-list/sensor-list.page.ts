import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './sensor-list.page.html',
  styleUrls: ['./sensor-list.page.scss'],
})
export class SensorListPage implements OnInit {

  public medicion:Medicion;
  public mediciones:Medicion[];
  public idDispositivo:string;



  constructor(private router:ActivatedRoute,
     private mServ:MedicionService, 
     private _router:Router) {
       
    this.addList();
  }

  async addList(){
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    //console.log("ID del sensor-List: "+this.idDispositivo)

    this.mediciones=await this.mServ.getMedicionesByIdDispositivo(this.idDispositivo);
    //console.log(this.mediciones);
  }

  ngOnInit(){
    //opción 1- utilizar libreria Momentjs , haciendo npm install --save moment y luego el import * as moment from 'moment'; en donde lo necesitemos.
    // let a : Medicion= new Medicion(99,moment().format("YYYY-MM-DD hh:mm:ss"),99,1);

    //opción 2, utilizar el objeto Date y hacer el formato necesario a mano.
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
    let a : Medicion= new Medicion(99,formatted_date,99,1);
   
    //this.mServ.agregarMedicion(a).then((med)=>{
    //  console.log(med)
    //});
  }

  detalleBack(){
    this._router.navigate(['/detalle-sensor/',this.idDispositivo]);
  }
  

}
