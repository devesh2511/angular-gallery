import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkDetailsComponent } from './artwork-details/artwork-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: ArtworkDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtworkRoutingModule {}
