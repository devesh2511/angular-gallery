import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedForLaterComponent } from './saved-for-later/saved-for-later.component';

const routes: Routes = [
  {
    path: "",
    component: SavedForLaterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveForLaterRoutingModule { }
