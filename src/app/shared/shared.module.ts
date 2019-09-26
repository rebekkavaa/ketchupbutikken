import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { BestsellersComponent } from './bestsellers/bestsellers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StarComponent,
    BestsellersComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
