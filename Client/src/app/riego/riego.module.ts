import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiegoPageRoutingModule } from './riego-routing.module';

import { RiegoPage } from './riego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiegoPageRoutingModule
  ],
  declarations: [RiegoPage]
})
export class RiegoPageModule {}
