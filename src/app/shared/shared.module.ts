import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BestsellersComponent } from './bestsellers/bestsellers.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    BestsellersComponent
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
