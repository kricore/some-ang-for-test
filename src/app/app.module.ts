import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


// import { MatMenuModule } from '@angular/material/menu';
// import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from "./app.component";
import { BatchUploadComponent } from "./forms/batch.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './routes.module';

import { Header } from "./common/header.component";
import { PostsModule } from "./posts.module";
import { MaterialUIModule } from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    BatchUploadComponent,
    Header
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialUIModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PostsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
