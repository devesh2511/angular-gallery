import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkCardComponent } from './components/artwork-card/artwork-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MaterialModule } from 'src/material/material.module';


@NgModule({
  declarations: [
    ArtworkCardComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    PageNotFoundComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ArtworkCardComponent,
    LoaderComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
