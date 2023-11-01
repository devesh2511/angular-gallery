import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';

const materialComponents = [
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule, 
  MatDialogModule,
  MatIconModule,
  MatDialogModule,
  MatIconModule
]

@NgModule({
  imports: [...materialComponents],
  exports: [...materialComponents]
})

export class MaterialModule { }
