import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { RiegoService } from '../services/riego.service';

import { Riego } from '../model/riego';
import * as moment from 'moment'

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.page.html',
  styleUrls: ['./detalle-sensor.page.scss'],
})
export class DetalleSensorPage implements OnInit {

  private idDispositivo:string;
  private valorObtenido:number=0;
  public myChart;
  private chartOptions;
  private medicion:Medicion;
  public dato:boolean=false;
  private riego:Riego;

  private current_datetime:Date;
  private estadoElectroValvula:number=0;
  private estadoButton:String="ABRIR ELECTROVALVULA";

  constructor(private router:ActivatedRoute,
     private mServ:MedicionService,
     private rServ:RiegoService,
      private _router:Router) {  
    
    
  }

  

  ngOnInit() { 
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.grafico();
    this.estadoEV();
  }

  async estadoEV(){
    this.estadoElectroValvula=await this.rServ.getEstadoByIdElectrovalvula(this.idDispositivo);
    console.log(this.estadoElectroValvula);

    this.riego=await this.rServ.getRiegoByIdElectrovalvula(this.idDispositivo);
    if(this.riego){
      //console.log("hay datos");
      
    }
    else{
      //console.log("no hay datos");
      this.riego=new Riego(1,0,'2020-01-01 00:00:00',Number(this.idDispositivo));

    }

    //this.estadoElectroValvula=this.riego.apertura;

    if(this.estadoElectroValvula==0){
      this.estadoButton="ABRIR EV";;
    }
    else{
      this.estadoButton="CERRAR EV";
    }
  }

  verMediciones(){
    this._router.navigate(['/dispositivo/',this.idDispositivo]);
  }

  verRiegos(){
    this._router.navigate(['/riegos/',this.idDispositivo]);
  }

  addEstadoEV(){
    this.current_datetime = new Date();
    let datetoday = moment(this.current_datetime).format('YYYY-MM-DD HH:mm:ss');
    //console.log(this.riego);
    this.riego.fecha=datetoday;
    
    if(this.estadoElectroValvula==0){

      //await this.rServ.addEstado(this.riego);
      this.riego.apertura=1;
      //console.log(this.riego);
      
      this.rServ.addEstado(this.riego)
      .subscribe(data => {
        console.log(data)
        //this.refreshPeople();
      });      
    }
    else{
      this.riego.apertura=0;
      /*DATO FICTICIO DE MEDICION AL CERRAR LA EV

      this.mServ.agregarMedicion(this.medicion);
      //await this.rServ.addEstado(this.riego); */
      this.rServ.addEstado(this.riego)
      .subscribe(data => {
        console.log(data)
        //this.refreshPeople();
      });
    }
    this.estadoEV();
  }

  async grafico(){
    this.valorObtenido=Number((await this.mServ.getMedicionByIdDispositivo(this.idDispositivo)).valor);
        setTimeout(()=>{
          console.log("Cambio el valor del sensor");
          //his.valorObtenido=(this.medicion.valor)  ;
          //llamo al update del chart para refrescar y mostrar el nuevo valor
          this.myChart.update({series: [{
              name: 'kPA',
              data: [this.valorObtenido],
              tooltip: {
                  valueSuffix: ' kPA'
              }
          }]});
        },8000);
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° '+this.idDispositivo
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}