import { Component, OnInit } from '@angular/core';
import { CsvServiceService } from '../csv-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-csv-tags',
  templateUrl: './csv-tags.component.html',
  styleUrls: ['./csv-tags.component.scss']
})
export class CsvTagsComponent implements OnInit {

  csvData: any[];
  private csvDataSub: Subscription;

  constructor(private csvDataService: CsvServiceService) { }

  ngOnInit(): void {
    this.csvDataSub = this.csvDataService.csvDataChanged.subscribe((data) => {
      this.csvData = data;
    });
  }

  ngOnDestroy() {
    this.csvDataSub.unsubscribe();
  }

}
