import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';

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
  private myChart;
  private chartOptions;
  public dato:boolean=false;
  private riego:Riego;
  private estadoSuelo:number;
  private current_datetime:Date;
  private estadoElectroValvula:number=0;
  
  //private estadoButton:String="ABRIR ELECTROVALVULA";

  constructor(private router:ActivatedRoute,
     private mServ:MedicionService,
     private rServ:RiegoService,
      private _router:Router) {  
    
      this.estadoEV();
      this.grafico();
  }

  ngOnInit() { 
    
  }

  async estadoEV(){

    //codigo para ver el estado de la Electrovalvula y la creacion de botones

    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.estadoElectroValvula=await this.rServ.getEstadoByIdElectrovalvula(this.idDispositivo);

    this.riego=await this.rServ.getRiegoByIdElectrovalvula(this.idDispositivo);

    //SI NO EXISTEN DATOS, DOY POR SENTADO QUE LA EV ESTA CERRADA
    if(!this.riego){
      this.estadoElectroValvula=0;
    }

    /*FORMA 2 de implementar los botones;
    if(this.estadoElectroValvula==0){
      this.estadoButton="ABRIR EV";;
    }
    else{
      this.estadoButton="CERRAR EV";
    }*/
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
    
    if(this.estadoElectroValvula==0){
      
      this.rServ.addEstado(1,this.idDispositivo,datetoday)
      .subscribe(data => {
        //console.log(data)
      });

    }
    else{

      this.rServ.addEstado(0,this.idDispositivo,datetoday)
      .subscribe(data => {
        //console.log(data)
      });

      //crea una nueva medicion cuando se cierra la EV
      
      let valor = Math.random();
      valor = Math.floor(valor * 100)%30;
        //console.log("SE AGREGO EL VALOR: "+valor);

      this.mServ.agregarMedicion(Number(this.idDispositivo),valor,datetoday)
      .subscribe(data => {
        //console.log(data)
      });
    }
    this.estadoEV();
    this.grafico();
  }

  async grafico(){
    this.valorObtenido=Number((await this.mServ.getMedicionByIdDispositivo(this.idDispositivo)).valor);
    
    /*PARA UN CODIGO MAS COMPLETO DEBERIA PROGRAMAR PARA EL CASO
      EN QUE NO EXISTAN DATOS DE MEDICIONES */

    if(this.valorObtenido<=10){
      this.estadoSuelo=0;
    }
    if(this.valorObtenido>10 && this.valorObtenido<=30){
      this.estadoSuelo=1;
    }
    if(this.valorObtenido>30){
      this.estadoSuelo=2;
    }

        setTimeout(()=>{
          //console.log("Cambio el valor del sensor");
          this.myChart.update({series: [{
              name: 'kPA',
              data: [this.valorObtenido],
              tooltip: {
                  valueSuffix: ' kPA'
              }
          }]});
        },2000);
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