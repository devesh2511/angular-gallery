import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkModule } from 'src/artwork/artwork.module';
import { HomeModule } from 'src/home/home.module';
import { SaveForLaterModule } from 'src/save-for-later/save-for-later.module';
import { PageNotFoundComponent } from 'src/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => HomeModule
  },
  {
    path: "artwork",
    loadChildren: () => ArtworkModule
  },
  {
    path: "savedForLater",
    loadChildren: () => SaveForLaterModule
  },
  {
    path: "pageNotFound",
    component: PageNotFoundComponent
  },
  {
    path: "**",
    redirectTo: 'pageNotFound', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
