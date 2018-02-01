import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { NameValuePair } from '../../models/name-value-pair';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  myControl: FormControl = new FormControl();

  options: string[] = [];

  filteredOptions: Observable<string[]>;
  types: NameValuePair[];

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.getCarTypes().subscribe(data => {
      this.types = data;
      console.log('data', data);
    } );

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );

  }
  populate(categoryId: number) {
    console.log('categoryId', categoryId);
    this.filterService.getCarMakes(categoryId)
    .subscribe((data: NameValuePair[]) => {
      data.forEach((nvp: NameValuePair) => this.options.push(nvp.name) );
    });
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  makeChosen() {
    console.log('optionChosen: ');
    console.log('this.myControl.value ', this.myControl.value);
  }

}
