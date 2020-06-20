import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';


// import { MatButtonModule } from '@angular/material/button';
// import { MatFileUploadModule } from 'angular-material-fileupload';

import { HomeComponent } from './home/home.component';
import { AddDataComponent } from './home/add-data/add-data.component';
import { CsvTagsComponent } from './home/csv-tags/csv-tags.component';
import { DisplayColumnsComponent } from './home/display-columns/display-columns.component';
import { ExportComponent } from './home/export/export.component';
import { CleanCsvComponent } from './home/clean-csv/clean-csv.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddDataComponent,
    CsvTagsComponent,
    DisplayColumnsComponent,
    ExportComponent,
    CleanCsvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
