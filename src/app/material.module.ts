import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from "@angular/material/dialog";

// configures NgModule imports and exports
@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule
  ],
})
export class MaterialUIModule { }
