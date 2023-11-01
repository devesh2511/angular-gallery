import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedForLaterComponent } from './saved-for-later/saved-for-later.component';
import { SaveForLaterRoutingModule } from './save-for-later-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/material/material.module';



@NgModule({
  declarations: [
    SavedForLaterComponent
  ],
  imports: [
    CommonModule,
    SaveForLaterRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SaveForLaterModule { }
