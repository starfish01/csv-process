import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgJsonEditorModule } from 'ang-jsoneditor'


import { HomeComponent } from './home/home.component';
import { AddDataComponent } from './home/add-data/add-data.component';
import { CsvTagsComponent } from './home/csv-tags/csv-tags.component';
import { DisplayColumnsComponent } from './home/display-columns/display-columns.component';
import { ExportComponent } from './home/export/export.component';
import { CleanCsvComponent } from './home/clean-csv/clean-csv.component';
import { JsonEditComponent } from './home/json-edit/json-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddDataComponent,
    CsvTagsComponent,
    DisplayColumnsComponent,
    ExportComponent,
    CleanCsvComponent,
    JsonEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    ClipboardModule,
    NgJsonEditorModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
