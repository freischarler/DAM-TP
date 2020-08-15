import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiegoPage } from './riego.page';

const routes: Routes = [
  {
    path: '',
    component: RiegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiegoPageRoutingModule {}
