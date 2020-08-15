import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Riego } from '../model/riego';
import { RiegoService } from '../services/riego.service';

@Component({
  selector: 'app-riego',
  templateUrl: './riego.page.html',
  styleUrls: ['./riego.page.scss'],
})
export class RiegoPage implements OnInit {

  public idDispositivo:string;
  public riegos:Riego[];

  constructor( private router:ActivatedRoute,
                private rServ:RiegoService, 
                private _router:Router ) { 
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.addList();
  }

  async addList(){
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    console.log("ID del sensor-List: "+this.idDispositivo)

    //this.medicion=await this.mServ.getMedicionByIdDispositivo(this.idDispositivo);
    this.riegos=await this.rServ.getRiegosByIdElectrovalvula(this.idDispositivo);
    //console.log(this.mediciones);
    
  }

  ngOnInit() {
  }


  detalleBack(){
    this._router.navigate(['/detalle-sensor/',this.idDispositivo]);
  }

}
