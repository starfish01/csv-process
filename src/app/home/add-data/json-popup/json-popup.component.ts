import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { CsvServiceService } from '../../csv-service.service';

@Component({
  selector: 'app-json-popup',
  templateUrl: './json-popup.component.html',
  styleUrls: ['./json-popup.component.scss'],
})
export class JsonPopupComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  public data: any;

  public fileTitle: string;

  constructor(
    public dialogRef: MatDialogRef<JsonPopupComponent>,
    private csvService: CsvServiceService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.setUpEditor();
  }

  onClickSave() {
    if (!this.fileTitle) {
      return;
    }
    this.csvService.addCsv({
      fileName: this.fileTitle,
      data: this.data,
    });
    this.onNoClick();
  }

  setUpEditor() {
    this.editorOptions = new JsonEditorOptions();
    // this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = 'code';
    this.data = [
      { title: 'M', value: 'M' },
      { title: 'F', value: 'F' },
    ];
  }
}
