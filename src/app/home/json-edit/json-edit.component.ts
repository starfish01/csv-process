import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CsvServiceService } from '../csv-service.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import * as _ from 'lodash';

@Component({
  selector: 'app-json-edit',
  templateUrl: './json-edit.component.html',
  styleUrls: ['./json-edit.component.scss'],
})
export class JsonEditComponent implements OnInit, OnDestroy {
  public editorOptions: JsonEditorOptions;
  public data: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;

  selectedCsv: any;
  private selectedCsvSub: Subscription;

  editorData: Object;

  constructor(private csvService: CsvServiceService) {}

  ngOnInit(): void {

    this.selectedCsv = this.csvService.selectedCsv;
    this.setUpEditor();
    this.selectedCsvSub = this.csvService.selectedCsvChanged.subscribe(
      (data) => {
        this.selectedCsv = data;
        this.setUpEditor();
      }
    );
  }

  setUpEditor() {
    this.editorOptions = new JsonEditorOptions();
    // this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = 'code';
    this.editorData = this.selectedCsv.data;
  }

  onSave() {
    this.selectedCsv.data = this.editorData;
    this.csvService.updateCsv(this.selectedCsv);
  }

  ngOnDestroy() {
    this.selectedCsvSub.unsubscribe();
  }
}
