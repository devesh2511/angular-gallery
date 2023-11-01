import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkDetailsComponent } from './artwork-details/artwork-details.component';
import { ArtworkRoutingModule } from './artwork-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ArtworkDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    ArtworkRoutingModule,
  ]
})
export class ArtworkModule { }
