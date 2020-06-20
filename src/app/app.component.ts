import { Component } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'csv-process';
  array = ['fff', 'ssss'];

  constructor() {

    _.forEach(this.array, item => {
      console.log(item);
    });
  }
}
