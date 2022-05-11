import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { GridService } from './grid.service';
import { CellComponent } from './cell/cell.component';



@NgModule({
  declarations: [
    GridComponent,
    CellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
